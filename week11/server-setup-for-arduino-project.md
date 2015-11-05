**Connecting an Arduino Yun to your node server**

1) First and foremost, make sure you have a working node/express app. If you have not done that yet, go [here](https://github.com/sslover/node-express-api-boilerplate), download the boilerplate repo, and go through the complete setup.

2) First thing we need to do is to configure our Heroku app to have a static IP (so that our Yun can post to it). We will use the Heroku add-on [Proximo](https://devcenter.heroku.com/articles/proximo) to accomplish this. In terminal, do the following:
	
	heroku addons:create proximo:development

Make a note of your static IP. Mine is 54.83.205.153

3) Configure your Arduino Yun to be able to GET data and POST data to your server:

	* Example of Arduino Yun GET sketch
	* Example of Arduino Yun POST sketch

4) Notice the following routes in the demo project (in index.js):

	

