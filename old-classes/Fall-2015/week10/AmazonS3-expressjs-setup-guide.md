**Setting up Amazon S3 for file/image storage**

1) First and foremost, make sure you have a working node/express app. If you have not done that yet, go [here](https://github.com/sslover/node-express-api-boilerplate), download the boilerplate repo, and go through the complete setup.

2) Set up an account at Amazon Web Services - https://aws.amazon.com

3) Log in to your console - https://console.aws.amazon.com/console/home

4) Click on "S3 - Scalable Storage in the Cloud"

5) Click "Create Bucket". A bucket is AWS terminology for the location where you'll be saving files to. Add a name for your bucket (names cannot have spaces, so do something like this-is-a-name). Choose the Region closest to you and click "Create".

You may want to write down your bucket name. We will be using it in a later step.

6) Now, go to your Node/Expressjs app (**important -- your node/expressjs app should already be setup and able to run, using the setup guide in the readme. If you have not done that yet, take a minute to setup your app**).

7) In terminal, let's add the AWS npm module. This will allow us to easily interface with our AWS S3 bucket.
	
	npm install --save aws-sdk

8) We'll also add a npm module to help us parse incoming files. In terminal, run the following:

	npm install --save connect-multiparty

9) Now, we need to add our AWS credentials to the .env file (remember that this is a secret file that holds credentials and other private information - we have it in .gitignore so it will not be shared on Github).

You can get your AWS Access Key and Secret Key by going to https://console.aws.amazon.com/iam/home#security_credential

Click to create a New Access Key. Follow the steps and get your access key and secret key.

In the .env file, add the following (replacing with your AWS specifics)

	AWS_ACCESS_KEY=YourAccessKeyGoesHere
	AWS_SECRET_KEY=YourSecretKeyGoesHere
	AWS_BUCKET_NAME=your-bucket-name-goes-here
	AWS_S3_PATH=https://s3.amazonaws.com/your-bucket-name-goes-here

We also need to add these credentials over at Heroku. Log in to your Heroku account. Click on your app. In the top area, click "Settings." Then click "Reveal Config Vars". 

We'll need to add the above 4 as Config Vars. For example, AWS_ACCESS_KEY will be the 'value' field and YourAccessKeyGoesHere will be the 'key' field. **Make sure you do this for all 4 of the above.**

10) Now, in routes > index.js, add the following code near the top (above your first route). You can reference [this file](https://github.com/sslover/class-example-itp-directory/blob/master/routes/index.js) for an example:

	// S3 File dependencies
	var AWS = require('aws-sdk');
	var awsBucketName = process.env.AWS_BUCKET_NAME;
	var s3Path = process.env.AWS_S3_PATH; // TODO - we shouldn't hard code the path, but get a temp URL dynamically using aws-sdk's getObject
	AWS.config.update({
	  accessKeyId: process.env.AWS_ACCESS_KEY,
	  secretAccessKey: process.env.AWS_SECRET_KEY
	});
	var s3 = new AWS.S3();

	// file processing dependencies
	var fs = require('fs');
	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();

11) Now, let's update our form (html) to be able to accept and post files. The full form HTML is available [here](https://github.com/sslover/class-example-itp-directory/blob/master/views/add-with-image.html) and you can find a demo [here](https://itp-directory.herokuapp.com/add-person-with-image)

We need to make the following additions to our form:

In the opening form tag, add enctype="multipart/form-data"

	<form method="post" action="/your/route/path" id="myForm" enctype="multipart/form-data">

Now, create a file input (notice the type below):

	<input type="file" name="image" id="image" value="Select a Photo">

12) Now, we need to add the code on our server's side to be able to 1. accept the file, 2. save it to AWS S3, and 3. save the s3 location of the file to our database.

We will do this in the route /api/create/image

See [this file](https://github.com/sslover/class-example-itp-directory/blob/master/routes/index.js) to find the below code:

	router.post('/api/create/image', multipartMiddleware, function(req,res){

	  console.log('the incoming data >> ' + JSON.stringify(req.body));
	  console.log('the incoming image file >> ' + JSON.stringify(req.files.image));

	  var personObj = {
	    name: req.body.name,
	    itpYear: req.body.itpYear,
	    interests: req.body.interests.split(','),
	    link: req.body.link,
	    slug : req.body.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
	  }

	  if (req.body.hasGlasses == 'yes') personObj['hasGlasses'] = true;
	  else personObj['hasGlasses'] = false;


	  // NOW, we need to deal with the image
	  // the contents of the image will come in req.files (not req.body)
	  var filename = req.files.image.name; // actual filename of file
	  var path = req.files.image.path; // will be put into a temp directory
	  var mimeType = req.files.image.type; // image/jpeg or actual mime type
	  
	  // create a cleaned file name to store in S3
	  // see cleanFileName function below
	  var cleanedFileName = cleanFileName(filename);

	  // We first need to open and read the uploaded image into a buffer
	  fs.readFile(path, function(err, file_buffer){

	    // reference to the Amazon S3 Bucket
	    var s3bucket = new AWS.S3({params: {Bucket: awsBucketName}});
	    
	    // Set the bucket object properties
	    // Key == filename
	    // Body == contents of file
	    // ACL == Should it be public? Private?
	    // ContentType == MimeType of file ie. image/jpeg.
	    var params = {
	      Key: cleanedFileName,
	      Body: file_buffer,
	      ACL: 'public-read',
	      ContentType: mimeType
	    };
	    
	    // Put the above Object in the Bucket
	    s3bucket.putObject(params, function(err, data) {
	      if (err) {
	        console.log(err)
	        return;
	      } else {
	        console.log("Successfully uploaded data to s3 bucket");

	        // now that we have the image
	        // we can add the s3 url our person object from above
	        personObj['imageUrl'] = s3Path + cleanedFileName;

	        // now, we can create our person instance
	        var person = new Person(personObj);

	        person.save(function(err,data){
	          if(err){
	            var error = {
	              status: "ERROR",
	              message: err
	            }
	            return res.json(err)
	          }

	          var jsonData = {
	            status: "OK",
	            person: data
	          }

	          return res.json(jsonData);        
	        })

	      }

	    }); // end of putObject function

	  });// end of read file
	})

	function cleanFileName (filename) {
	    
	    // cleans and generates new filename for example userID=abc123 and filename="My Pet Dog.jpg"
	    // will return "abc123_my_pet_dog.jpg"
	    var fileParts = filename.split(".");
	    
	    //get the file extension
	    var fileExtension = fileParts[fileParts.length-1]; //get last part of file
	    
	    //add time string to make filename a little more random
	    d = new Date();
	    timeStr = d.getTime();
	    
	    //name without extension
	    newFileName = fileParts[0];
	    
	    return newFilename = timeStr + "_" + fileParts[0].toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_') + "." + fileExtension;
	    
	}

13) Go back and look in your AWS bucket. You can see you'll have some images there!