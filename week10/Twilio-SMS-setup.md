**Setting up Twilio for SMS**

1) First and foremost, make sure you have a working node/express app. If you have not done that yet, go [here](https://github.com/sslover/node-express-api-boilerplate), download the boilerplate repo, and go through **the complete setup**.

2) Set up an account at Twilio (the SMS service we will be using) - https://www.twilio.com/

3) Go to [Get Started With Messaging](https://www.twilio.com/user/account/messaging/getting-started)

4) Click "Get Your First Twilio Phone Number". Write it down. The example app is (646) 846-8769.

5) Now, we need to add our Twilio credentials to the .env file (remember that this is a secret file that holds credentials and other private information - we have it in .gitignore so it will not be shared on Github).

You can get these credentials by clicking "Show API Credentials" in the top right of [this page](https://www.twilio.com/user/account/messaging/dashboard)

In the .env file, add the following (replacing with your Twilio specifics)

	TWILIO_ACCOUNT_SID=YourAccountSidGoesHere
	TWILIO_AUTH_TOKEN=YourAuthTokenGoesHere

We also need to add these credentials over at Heroku. Log in to your Heroku account. Click on your app. In the top area, click "Settings." Then click "Reveal Config Vars". 

We'll need to add the above 2 as Config Vars. For example, TWILIO_ACCOUNT_SID will be the 'value' field and YourAccountSidGoesHere will be the 'key' field. **Make sure you do this for both of the above.** 

(if you don't do the above setup, your app won't work on Heroku)

6) Now, let's get setup with the Twilio npm module. Full documentation is [here](http://twilio.github.io/twilio-node/)

First thing we'll want to do is install the Twilio npm module for our app. In terminal, navigate to your app and then run:

	npm install --save twilio

7) We also need to declare Twilio as a dependency at the top of our index.js file. Include this above your first route:

	//Twilio
	var twilio = require('twilio');

8) We can now interact with our twilio number!

There's a few steps here:

1. Twilio receives the incoming message.
2. We setup a callback with Twilio (i.e. how should Twilio communicate the incoming message **back** to your app)
3. Receive the message within the callback in index.js
4. Process the message and save to database
5. Respond back to the user via an SMS

**Step 1 -  Receive an incoming message**

Every time a message comes in, we need to tell Twilio what to do with it. We do that by dictating a callback route on our server (where Twilio should POST that message).

First, we'll set that up at Twilio. Go to your [Twilio Phone Numbers](https://www.twilio.com/user/account/messaging/phone-numbers). Click on the phone number you are using.

In the Request URL field, put the following:

https://your-app-name-here.herokuapp.com/twilio-callback

Now, every time a message comes in, Twilio will post it to the route /twilio-callback on your server.

**Step 2 -  Create the Callback Route**

In our index.js, we now need to create that callback route (/twilio-callback):

	// this route gets called whenever Twilio receives a message
	router.post('/twilio-callback', function(req,res){

	  // there's lots contained in the body
	  console.log(req.body);

	  // the actual message is contained in req.body.Body
	  var incomingMsg = req.body.Body;

		// full fields available in the req.body:
		// { ToCountry: 'US',
		// ToState: 'NY',
		// SmsMessageSid: 'SM9115146d8b3d53529e6b83a79448a6a9',
		// NumMedia: '0',
		// ToCity: '',
		// SmsSid: 'SM9115146d8b3d53529e6b83a79448a6a9',
		// FromState: 'GA',
		// FromZip: '30294',
		// SmsStatus: 'received',
		// To: '+16468468769',
		// FromCity: 'ATLANTA',
		// ApiVersion: '2010-04-01' 
		// NumSegments: '1',
		// MessageSid: 'SM9115146d8b3d53529e6b83a79448a6a9',
		// From: '+14043230470',
		// AccountSid: 'AC7cc044438cf51cbf44b75a095b40bf05',
		// ToZip: '',
		// Body: 'Just testing this demo!',
		// FromCountry: 'US'}			  

	})

**Step 3, 4, 5 -  Receive the message in the callback, save to database, respond back to user with an SMS**

	router.post('/twilio-callback', function(req,res){

	  // there's lots contained in the body
	  console.log(req.body);

	  // the actual message is contained in req.body.Body
	  var incomingMsg = req.body.Body;
	  console.log(incomingMsg);

	  var incomingNum = req.body.From;

	  // now, let's save it to our Database
	  var msgToSave = {
	    status: incomingMsg,
	    from: incomingNum
	  }

	  var status = new Status(msgToSave)

	  status.save(function(err,data){
	    // set up the twilio response
	    var twilioResp = new twilio.TwimlResponse();
	    if(err){
	      // respond to user
	      twilioResp.sms('Oops! We couldn\'t save status --> ' + incomingMsg);
	      // respond to twilio
	      res.set('Content-Type', 'text/xml');
	      res.send(twilioResp.toString());      
	    }
	    else {
	      // respond to user
	      twilioResp.sms('Successfully saved status! --> ' + incomingMsg);
	      // respond to twilio
	      res.set('Content-Type', 'text/xml');
	      res.send(twilioResp.toString());     
	    }
	  })


	})

Full code is [here](https://github.com/sslover/node-express-twilio-sms/blob/master/routes/index.js).

9) And we're good to go! Unfortunately, we cannot test this locally as there isn't really a way for Twilio to send a POST to localhost (remember, that is running on your computer, not a publicly accessible server). So, we'll need to push the app to Heroku and test there:

	git push heroku master

10) Now, we can see the incoming message by turning on server logs at Heroku. In terminal:
	
	heroku logs --tail

11) Send a text message to your Twilio number and you should see it come in the Terminal (which is showing the logs of your Heroku server)