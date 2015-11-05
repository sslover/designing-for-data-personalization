**Setting up Twilio for SMS**

1) First and foremost, make sure you have a working node/express app. If you have not done that yet, go [here](https://github.com/sslover/node-express-api-boilerplate), download the boilerplate repo, and go through the complete setup.

2) Set up an account at Twilio (the SMS service we will be using) - https://www.twilio.com/

3) Go to [Get Started With Messaging](https://www.twilio.com/user/account/messaging/getting-started)

4) Click "Get Your First Twilio Phone Number". Write it down. The example app is (646) 846-8769.

5) Now, we need to add our Twilio credentials to the .env file (remember that this is a secret file that holds credentials and other private information - we have it in .gitignore so it will not be shared on Github).

You can get these credentials by clicking "Show API Credentials" in the top right of [this page](https://www.twilio.com/user/account/messaging/dashboard)

In the .env file, add the following (replacing with your Twilio specifics)

	TWILIO_ACCOUNT_SID=YourAccountSidGoesHere
	TWILIO_AUTH_TOKEN=YourAuthTokenGoesHere

We also need to add these credentials over at Heroku. Log in to your Heroku account. Click on your app. In the top area, click "Settings." Then click "Reveal Config Vars". 

We'll need to add the above 2 as Config Vars. For example, TWILIO_ACCOUNT_SID will be the 'value' field and YourAccountSidGoesHere will be the 'key' field. **Make sure you do this for all 2 of the above.** 

(if you don't do the above setup, your app won't work on Heroku)

6) Now, let's get setup with the Twilio npm module. Full documentation is [here](http://twilio.github.io/twilio-node/)

First thing we'll want to do is install the Twilio npm module. In terminal:

	npm install --save twilio

7) We also need to declare Twilio as a dependency at the top of our index.js file. Include this above your first route:

	//Twilio
	var twilio = require('twilio');

8) We can now interact with our twilio number!

There's a few steps here:

1. Receive an incoming message
2. Setup a callback with Twilio (i.e. how should Twilio communicate the incoming message to your app)
3. Receive the message within the callback
4. Process the message and save to database
5. Respond back to the user via an SMS

**Step 1 -  Receive an incoming message**

Every time a message comes in, we need to tell Twilio what to do with it. We do that by dictating a callback route on our server (where Twilio should send POST that message).

First, we'll set it up at Twilio. Go to your [Phone Numbers](https://www.twilio.com/user/account/messaging/phone-numbers). Click on the phone number you are using.

In the Request URL field, put the following:

https://your-app-name-here.herokuapp.com/twilio-callback

Now, every time a message comes in, Twilio will post it to that route.

In our index.js, we need to create that callback route:

	router.