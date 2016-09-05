**Connecting an Arduino Yun to your node server**

1) First and foremost, make sure you have a working node/express app. If you have not done that yet, go [here](https://github.com/sslover/node-express-api-boilerplate), download the boilerplate repo, and go through the complete setup.

2) Configure your Arduino Yun to Connect to Internet

**Connect Arduino Yun to the Internet**

See full guide here: https://www.arduino.cc/en/Guide/ArduinoYun#toc14

When you first power on the Yún, it will create a WiFi network called ArduinoYun-XXXXXXXXXXXX. Connect your computer to this network.

Once you've obtained an IP address, open a web browser, and enter http://arduino.local or 192.168.240.1 in the address bar. After a few moments, a web page will appear asking for a password. Enter "arduino" and click the Log In button.

You will find a page with some diagnostic information about the current network connections. The first is your WiFi interface, the second is your ethernet connection. Press the Configuration button to proceed.

On the new page, you will configure your Yún, giving it a unique name and identifying what network you want to connect to.

In the Yún NAME field, give your Arduino a unique name. You'll use this to refer to it in the future.

Choose a password of 8 or more characters for your Arduino. If you leave this field blank, the system retains the default password of arduino

If you wish, you can set the timezone and country. It is recommended to set these options as it may help connecting to local WiFi networks. Setting the local timezone also selects the country's regulatory domain.

Enter the name of the wiFi network you wish to connect to. If you are using the itp-sandbox, you'll need to get a password from Marlon. I just used my iPhone as a wifi hotspot.

Select the security type, and enter the password.

When you press the Configure & Restart button, the Arduino will reset itself and join the specified network. The Arduino network will shut down after a few moments.

You can now join the network you assigned to the Yún.

4) Program the Yun to talk to the server.

Example of Arduino Yun GET Example
----------------------------------

The first example will allow our Yun to get data from our server.

In our server, we'll have a route that gives us a simple status that our Arduino can act on. Examples of what a server could give our Yun:

 * Server relays a status like "awake", "asleep". Our Yun gets that message and acts based on it.
 * Server relays the most recent sensor reading that it has stored. Our Yun gets that message and acts based on it.
 * Server relays a recent activity, like a state at a Webpage ("on" or "off"). Our Yun gets that message and acts based on it. For example, turning a Webpage into a light switch.

**Example of Arduino Yun GET sketch**

See this route: https://twilio-sms-example.herokuapp.com/api/get/latest

Code (see /api/get/latest): https://github.com/sslover/node-express-twilio-sms/blob/master/routes/index.js

We have a route that offers up the latest status from our database. Notice that we are using res.send(), as opposed to res.json(), because we are sending a simple message rather than JSON. This is desirable -- it is best to do most of your logic on the server, and then send a simple state or message for your Arduino to act on.

To see how the Arduino Yun can connect to the above data, see this example: https://github.com/sslover/node-express-api-arduino-yun/blob/master/arduino_http_client/HttpClientExample.ino

It is based on Tom Igoe's HTTPClient example: https://www.arduino.cc/en/Tutorial/HttpClient

Example of Arduino Yun POST Sketch
-----------------------------------

The above is the process for getting data from the server, but how could we post data to the server? It's a tad trickier. 

The first thing we'll have to do is to configure our Heroku app to have a static IP (so that our Yun can post to it). We will use the Heroku add-on [Proximo](https://devcenter.heroku.com/articles/proximo) to accomplish this. In terminal, do the following (note that this costs $5/month, so be sure to cancel it once you're done with this app... you can cancel by removing the add-on at Heroku).
	
	cd path/to/your/app
	heroku addons:create proximo:development

Make a note of your static IP. Mine is 54.83.205.153

Now, you need to download and configure the proximo add-on. Run the following commands one-by-one (in terminal, within your app):
	
	cd path/to/your/app
	curl http://downloads.proximo.io/proximo-stacklet.tgz | tar xz
	git add bin/proximo vendor/dante
	git commit -m "add proximo stacklet"

Now, we need configure our package.json so that any incoming connections will be forwarded through our proxy. In package.json, make sure the start script is as follows:

	"start": "bin/proximo node ./bin/www"

(note that the above will only work on Heroku, not locally)

Now, push the app to heroku

5) Create the API route on your server

We need a POST route that can accept data from our Yun as it comes in:

See https://github.com/sslover/node-express-api-arduino-yun/blob/master/routes/index.js

	router.post('/api/sensor/write', function(req,res){
	    console.log(req.body);
	    
	    var currentTemp = req.body.temperature;
	    // can now save to DB
	    var temperature = new Temperature({value:currentTemp})

	    temperature.save(function(err,data){
	    	if(err){
	    		res.json({status:'error',message: err})
	    	}
	    	res.json(data);
	    })

	})	


6) Write the Arduino Sketch to post data

See https://github.com/sslover/node-express-api-arduino-yun/blob/master/arduino_post_to_server/arduino_post_to_server.ino

Look at comments, and change parameters where needed.