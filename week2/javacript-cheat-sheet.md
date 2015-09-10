Javascript Cheat Sheet
============================================

Printing Out Values
-------------------

Use console.log to print out values:

	var name = "Andrew";
	console.log(name); // prints Andrew

Comments
---------
Comments your code with //

	// this is a comment
	var dog; // this is a comment about a dog

It's often a good idea to comment the steps needed for a function before writing it:

	// step 1 - do this
	// step 2 - then, do this
	// step 3 - then, do this
	// step 4 - if this condition, do this; else, do this
	// step 5 - finally, do this 

Data Types / Variables
----------------------

JavaScript variables can hold the following data types: 

* numbers
* strings
* booleans 
* arrays
* objects

Numbers
-------
JavaScript has only **one** type of numbers.

Numbers can be written with, or without decimals:

	var num = 12; // Written without decimals
	var num = 12.43; // Written with decimals

Strings
-------
A string (or a text string) is a series of characters like "Hello World".

Strings are written with quotes. You can use single or double quotes:
	
	var message = "Hello World"; // double quotes
	var message = 'Hell world'; //single quotes

Booleans
--------

Booleans can only have two values: true or false.

	var isAwake = true; // set it to true
	var isAsleep = false; // set it to false

Arrays
--------

JavaScript arrays are written with square brackets.

Declare an array:

	var names = [];
	var names = new Array();

Array items are separated by commas.

	var names = ["Dan","Dave","Dexter"]; // array of Strings
	var ages = [12,24,15] // array of numbers

You can get the length of the array with .length
	
	var names = ["Dan","Dave","Dexter"]; // array of Strings
	names.length // prints 3

You can add to an array with the push function
	
	var names = ["Dan", "Dave", "Dexter"];
	names.push("Dante");

	console.log(names); // prints ["Dan", "Dave", "Dexter", "Dante"]

You can remove from an array with the pop function (removes the last item)

	var names = ["Dan", "Dave", "Dexter"];
	names.pop();

	console.log(names); // prints ["Dan", "Dave"] 

You can add/remove within the array with the splice() function. Read about it [here](http://www.w3schools.com/jsref/jsref_splice.asp).

Objects
-------

JavaScript objects are written with curly braces.

Object properties are written as key:value pairs, separated by commas.

Objects can hold any combination of data types:

	// a pet object
	var pet = {
		name: "Billy",
		age: 12,
		interests: ["Eating", "Sleeping", "Playing"],
		isDog: true,
		socialMediaAccounts: {
			instagram: "www.instagram.com/billyTheDog",
			facebook: "www.facebook.com/billyTheDog",
			twitter: "www.twitter.com/billyTheDog"
		}
	}

You can access specific key:values with the . syntax

	console.log(pet.name); // prints "Billy"
	console.log(pet.age); // prints 12
	console.log(pet.interests); // ["Eating", "Sleeping", "Playing"]
	console.log(pet.isDog); // prints true

	console.log(pet.socialMediaAccounts) // prints entire object
	
	console.log(pet.socialMediaAccounts.facebook) // prints www.facebook.com/billyTheDog

You can dynamically add to the object:

	pet.bestFriend = "Zoe"; // the object now includes the key bestFriend which has the value "Zoe"

	pet['bestFriend'] = "Zoe"; // another way of doing the same thing

You can dynamically remove from the object:

	delete pet.bestFriend; // the bestFriend key is completely deleted
	delete pet['bestFriend'] // another way of doing the same thing

Dynamic Data Types
------------------

JavaScript has dynamic types. This means that the same variable can be used as different types:

	var x;               // Now x is undefined
	var x = 5;           // Now x is a Number
	var x = "John";      // Now x is a String

	var x = {
		age: 5,
		name: "John"
	} // Now x is an Object

	var x = ["John", "Joe", "Jason"] // Now x is an array

Casting
-------

It's often useful to use casting - turning one data type into another

The toString() method converts a number to a string.

	var num = 15;
	var n = num.toString();

	console.log(num) // the number 15
	console.log(n) // the string "15"

The parseInt() function parses a string and returns an integer.

	var age = "10";
	var a = parseInt(age)

	console.log(age) // prints the string "10"
	console.log(a) // prints the number 10

The parseFloat() function parses a string and returns a floating point number.

	var price = "9.99";
	var pFloat = parseFloat(price);
	var pInt = parseInt(price);

	console.log(price) // prints the string "9.99"
	console.log(pFloat) // prints the number 9.99
	console.log(pInt) // prints the number 9

typeOf
------
You can use the JavaScript typeof operator to find the type of a JavaScript variable:

	typeof "Tim"                // Returns string 
	typeof 4.55                  // Returns number
	typeof false                 // Returns boolean
	typeof [1,2,3,4]             // Returns object
	typeof {name:'John', age:19} // Returns object	

Undefined and Null Data Types
-----------------------------

In JavaScript, a variable without a value, has the value undefined. The typeof is also undefined.
	
	var person; // Value is undefined, type is undefined

	person = {
		name: "Joanna",
		age: 27
	} // it's an object now

	// Any variable can be emptied, by setting the value to undefined. The type will also be undefined.

	person = undefined; // Value is undefined, type is undefined

In JavaScript, null is "nothing". It is supposed to be something that doesn't exist. Can empty an object by setting it to null or undefined.

	var person = null; // Value is null

Functions
---------

Functions are the core part of your Javascript program. They specify functionality.

There are 2 ways of declaring a function.

	var sayHi = function(){
		console.log('hi');
	}

	function sayHello(){
		console.log('hello');
	}

	// call the functions
	sayHi();
	sayHello();

The main difference between the 2 is when they can be called. The first example can only be called *after* it is declared:

	sayHi(); // this is an error, not declared yet

	var sayHi = function(){
		console.log('hi');
	}

	sayHi(); // prints 'hi'

The second example can be called anywhere within its scope, even before it has been declared.

	sayHello(); // prints 'hello'

	function sayHello(){
		console.log('hello');
	}

Functions can take any number or parameters.

	function describePet(name, age, gender){

		var genderPronoun = "she";
		if(gender=="male") genderPronoun = "he";

		console.log("This is " +name+ " and "+genderPronoun+" is "+age+" years old.")

		var humanYears = age*7;

		console.log("In human years, that's like "+humanYears+" years");

	}

	describePet("Joey", 7, "male");

	describePet("Jill", 4, "female");

Functions can return values

	var square = function(num) {
	  return num * num;
	};

	var num = square(2); 
	console.log(num); // prints 4

	var num2 = square(7);
	console.log(num2); // prints 49

	var joinNames = function(firstName, lastName){
		return firstName + " " + lastName;
	}

	var completeName = joinNames("Dan", "Shiffman")

	console.log(completeName); // prints Dan Shiffman

Functions can take parameters and return values. This can be particularly useful when returning an object.

	var message1 = createMessage("Jack", "Jill", "Let's get some water?");
	var message2 = createMessage("Kanye", "Taylor", "Imma let you finish, but");

	console.log(message1) // prints the message1 object
	console.log(message2) // prints the message2 object

	function createMessage(person1, person2, subject){
		
		var msgToReturn = {
			from: person1,
			to: person2,
			subject: subject,
			date : new Date()
		}

		return msgToReturn;
	}

Iteration (Loops)
-----------------

Regular for loop

	var names = ["Maria", "Xuedi", "Rios", "Katie", "Surya"];
	
	// going forward
	for(var i=0;i<names.length;i++){
		console.log("Hi " + names[i]);
	}

	// going backward
	for(var i=names.length-1;i>=0;i--){
		console.log("Hi " + names[i]);
	}	

forEach loop
	
	var names = ["Maria", "Xuedi", "Rios", "Katie", "Surya"];

	names.forEach(function(e,i){
		console.log('we are on element #' + i);
		console.log('the element is ' + e);
	})


Comparisons
-----------

**if(condition)**

	var name = "Laura";

	if (name == "Laura") {
	    console.log("the name is laura!");
	}

**Operators && (and) || (or) ! (negate)**

	var isAwake = true;
	var isAtItp = true;

	if (isAwake == true) { 
		console.log("Good Morning!"); 
	}

	// multiple conditions using the && (and) operator
	if (isAwake && isAtItp) {
	    console.log("I'm so busy");
	}

	// negate condition with !
	if (!isAwake) {
	    console.log("You must be asleep then");
	}

	// negate condition with !
	if (!isAwake && isAtItp) {
	    console.log("You are sleeping at ITP");
	}

	// the OR operator
	var hasCoffee = true;
	var hasTea = false;

	if ( hasCoffee || hasTea ) {
	    console.log("I can stay awake");
	}

**if(condition) / else if(condition) / else**

	var hasCoffee = true;
	var hasTea = false;
	var isWeekend = true;

	if ( hasCoffee || hasTea ) {
	  console.log("I can stay awake");
	}
	else if(isWeekend){
		console.log("I'll drink beer instead")
	}
	else{
		console.log("I need coffee or tea")
	}

**Switch Statements**

Switch statements are another way to make comparisons:

	switch(expression) {
	  case n:
	      code block
	      break;
	  case n:
	      code block
	      break;
	  default:
	      default code block
	}

	// example with a string

	var message = computeMessage("happy");

	console.log(message); // prints hooray

	function computeMessage(mood){

		switch(mood) {
		    case "hungry":
		        return "need food"
		        break;
		    case "sad":
		        return "boohoo";
		        break;
		    case "happy":
		        return "hooray";
		        break;		        
		    default:
		        return "here's just a default message";
		}
	
	}


Rounding
--------
Round a number to its nearest integer

	Math.round(4.4) // 4
	Math.round(4.6) // 5

Round a number downward to its nearest integer:

	Math.floor(4.6); //4

Round a number upward to it's nearest integer:

	Math.ceil(4.4); // 5

Random Number
-------------

	// Return a random number between 0 (inclusive) and 1 (exclusive):
	Math.random();

	// Return a random number between 0 (inclusive) and 3000 (exclusive):
	Math.random(3000);

	// Return a random number between 1 and 10:
	Math.floor((Math.random() * 10) + 1);

	// Return a random number between 1 and 100:
	Math.floor((Math.random() * 100) + 1);

Callbacks
---------

Callbacks are a key part of Javascript (but can be confusing):

* Callbacks basically allow the execution of a function to include 'next' steps when the requested function finishes.
* Callbacks are functions passed into a function.

		// CALLBACK EXAMPLE 
		// we want to do the following:
		// 1. take an array of pets and find all the dogs in that array
		// 2. once we have done that, say "Good Dog" to all the dogs
		// (but we cannot do #2 until #1 has completed, so we need a callback)

		// first function takes in an array and callback
		// the function operates on the array and returns the callback
		// the callback returns an error or the data

		var findDogsInArray = function(array,callback){

			// if no array is passed in, let's send back an error
			if(!array || typeof array != "object") return callback("Error: required field is malformed", null);

			var dogsToReturn = new Array();

			array.forEach(function(e){
				if(e.type=="dog") dogsToReturn.push(e)
			})

			return callback(null,dogsToReturn);
		}

		// now, let's write a function that takes in array 
		// and says "Good Dog" to each of the elements

		var sayGoodDog = function(array){
			array.forEach(function(e){
				console.log("You're a good dog " + e.name);
			})
		}

		// the pets array
		var pets = [
			{
				name: "Lilly",
				type: "dog"
			},
			{
				name: "Smokey",
				type: "cat"
			},
			{
				name: "Zoe",
				type: "dog"
			}		
		]

		// now, let's call the function to findDogsInArray
		// it takes in the pets array, and the callback, 
		// which can return an error or the data

		findDogsInArray(pets,function(err,data){
			if(err) {
				console.log("We have an error --> " + err);
			}
			else{
				var dogs = data;
				// now that we have the dogs data, can call the sayGoodDog function
				sayGoodDog(dogs);
			}
		})

The Anatomy of a Client-Side JS Program - Events
------------------------------------------------

Javascript is largely centered around events. You need to specify when you want a function to execute. There's many events that you can bind functions to:

* onload - when the page loads, execute function(s)
* onclick - when the user clicks something, execute function(s)
* timed events - after a certain amount of time, run a function(s)
* etc

For example, the following JS code would never run, because it isn't bound to any event. While we do declare the function, we never actually attach it to an event that will make it execute.


	<!DOCTYPE html>
	<html>
	 <head>
	  <meta charset="UTF-8">
	  <title>hello world</title>
	 </head>
	 <body>
	 </body>

	 <script type="text/javascript">
	 	function sayHi(){
	 		alert('hi!');
	 	}
	 </script>

To make it run, we could attach it to the onload event. Meaning, when the page loads, the code runs.

	<!DOCTYPE html>
	<html>
	 <head>
	  <meta charset="UTF-8">
	  <title>hello world</title>
	 </head>
	 <body onload="sayHi()">
	 </body>

	 <script type="text/javascript">
	 	function sayHi(){
	 		alert('hi!');
	 	}
	 </script>

Another way of doing the same thing is to attach an event listener:

	<!DOCTYPE html>
	<html>
	 <head>
	  <meta charset="UTF-8">
	  <title>hello world</title>
	 </head>
	 <body>
	 </body>

	 <script type="text/javascript">
	 	function sayHi(){
	 		alert('hi!');
	 	}

	 	window.addEventListener('onload',sayHi);
	 </script>

Example of Events
------------------

Onload is just one type of event. There are many events you can bind your functions to. **For a full list of events, see [this resource](http://www.w3schools.com/tags/ref_eventattributes.asp)**

Some of the most useful include:

**Window Events**

Events triggered for the window object (applies to the <body> tag).

Some of the most useful:

* onload - Fires after the page is finished loading
* onunload - Fires once a page has unloaded (or the browser window has been closed)
* onresize - Fires when the browser window is resized

To attach functions to these events, you can use window.addEventListener

	function introduceMyself(){
		alert("Hi, I'm a dog");
	}

	// run on page load
	window.addEventListener("onload", introduceMyself);

	// run on page resize
	window.addEventListener("resize", introduceMyself);

	// run on page unload/close
	window.addEventListener("onunload", introduceMyself);

**Form Events**

Events triggered by actions inside a HTML form (applies to almost all HTML elements, but is most used in form elements).

Some of the most useful:

* onchange -	Fires the moment when the value of the form element is changed
* onsubmit - Fires when a form is submitted

To attach functions to these events, you can use document.getElementById('idName').addEventListener

	<!DOCTYPE html>
	<html>
	 <head>
	  <meta charset="UTF-8">
	  <title>hello world</title>
	 </head>
	 <body>
	 	<input type="text" id="theInput" />
	 </body>

	 <script type="text/javascript">
	    function giveValue(event){
	    	console.log(event); // gives us access to the event that triggered it
	    	var val = document.getElementById('theInput').value;
	    	// or var val = event.target.value;
	      alert('the current value is -> ' + val);
	    }

	    document.getElementById('theInput').addEventListener('change', giveValue);
	 </script>	

**Mouse & Keyboard Events**

Events triggered by a mouse, keyboard, or similar user actions.

Some of the most useful:

* onclick - Fires on a mouse click on the element
* ondrag - Script to be run when an element is dragged
* onscroll - Script to be run when an element's scrollbar is being scrolled 
	* usually you will call this, determine where the user is, and call a function according to their position
* onkeydown	-	Fires when a user is pressing a key
* onkeypress -	Fires when a user presses a key
* onkeyup	-	Fires when a user releases a key

		<!DOCTYPE html>
		<html>
		 <head>
		  <meta charset="UTF-8">
		  <title>hello world</title>
		 </head>
		 <body>
		 	<a href="#" id="theLink">Click Me Please</a>
		 </body>

		 <script type="text/javascript">
		 		var counter = 0;
		    function hootyHoo(event){
		    	console.log(event); // gives us access to the event that triggered it
		    	counter++;
		      alert('hooty hoo ' + counter);
		      event.preventDefault(); // stops the event from propagating the way it normally would; for example, there won't be a '#' in the URL
		    }
		    document.getElementById('theLink').addEventListener('click', hootyHoo);
		 </script>

preventDefault()
----------------

Occassionally you will want to prevent a default action from happening. For example, in the above example, where we didn't want the page to actually treat it like a link and go to a new URL (we wanted to cancel that default action and just detect the click event).

The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

For example, this can be useful when:

* Clicking on a "Submit" button, prevent it from submitting a form
* Clicking on a link, prevent the link from following the URL

AJAX
----

AJAX is the art of exchanging data with a server, and updating parts of a web page - without reloading the whole page.

You can use AJAX to make any type of HTTP request from within your Javascript script. The most common will be GET requests (usually, getting data) and POST requests (usually, posting data).

While you can do AJAX without JQuery, the JQuery way is generally the most straightforward. To use JQuery, you just need to link to it from your HTML (generally before your other JS scripts).

	<!-- JQuery Library -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<!-- OUR JS -->
	<script src="js/main.js"></script>
	
To make a GET Request with JQuery:

	// GET REQUEST
	$.ajax({
	    url: 'http://theUrlThatYouAreRequestingFrom.com',
	    type: 'GET',
	    failure: function(err){
	    	// what to do on failure
	    	// generally, handle the error
	    },
	    success: function(response) {
	    	// what to do on success
	      console.log(response);
	    }
	});

To make a POST Request with JQuery:

	var dataToSend = {
		name: "Billy",
		animalType: "Dog",
		currentState: "Sleeping"
	}

	// POST REQUEST
	$.ajax({
	    url: 'http://theUrlThatYouArePostingTo.com',
	    type: 'POST',
	    data: dataToSend, // the data object we're posting
	    failure: function(err){
	    	// what to do on failure
	    	// generally, handle the error
	    },
	    success: function(response) {
	    	// what to do on success
	      console.log(response);
	    }
	});