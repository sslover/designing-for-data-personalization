Setting up Social Services (NPM)
================================

The below assumes you already have set-up a working nodejs/express app. If you have not done that yet, go [here](https://github.com/sslover/node-express-api-boilerplate), download the boilerplate repo, and go through the complete setup.

Twitter
-------

1) Install the Twitter npm modul. In terminal:

	cd path/to/your/app
	npm install --save twitter

2) Declare it at the top of your index.js file

	// TWITTER SETUP //
	// You must create an app as a developer here: https://apps.twitter.com/
	var Twitter = require('twitter');
	 
	var client = new Twitter({
	  consumer_key: process.env.TWITTER_CONSUMER_KEY,
	  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

3) You need to get credentials from Twitter.

Create an app as a developer here: https://apps.twitter.com/

Once you've done that, get the 4 credentials above for your app (you will need to click the button to create an access key).

Now, put those values in your .env file, like:

	TWITTER_CONSUMER_KEY=YOUR_VALUE_HERE
	TWITTER_CONSUMER_SECRET=YOUR_VALUE_HERE
	TWITTER_ACCESS_TOKEN_KEY=YOUR_VALUE_HERE
	TWITTER_ACCESS_TOKEN_SECRET=YOUR_VALUE_HERE

We also need to include them at our Heroku app. Go to heroku.com, click on your app, click settings up top, go to "Reveal Config Vars"

Add all 4 of the above as Config Vars, in the manner of key/values (with the first component being the key, and the second one being the value).

4) Now, you need to choose how to use the API. A basic example is here:

	router.get('/api/get/twitter/:user', function(req,res){

	  var requestedScreeName = req.params.user;

	  console.log(requestedScreeName);

	  client.get('statuses/user_timeline', {screen_name: requestedScreeName}, function(error, tweets, response){
	    if (!error) {
	      console.log(tweets);
	    }

	    console.log(tweets);

	    res.json(tweets);
	  });  

	})

For a full list of API methods at Twitter, see https://dev.twitter.com/rest/public

You can change the api method by changing the following in the above example:

* 'statuses/user_timeline' (change to the method you want)
* {screen_name: requestedScreeName} (change to any parameters you want to pass)

Instagram
---------





