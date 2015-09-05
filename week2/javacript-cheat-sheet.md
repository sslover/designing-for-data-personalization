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

Array items are separated by commas.

	var names = ["Dan","Dave","Dexter"]; // array of Strings
	var ages = [12,24,15] // array of numbers

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

Functions can take parameters and return values. This is particularly useful when returning an object.

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
		// 2. once we have done that, say "Good Boy" to all the dogs
		// (but we cannot do #2 until #1 has completed, so we need a callback)

		// first function takes in an array and callback
		// the function operateson the array and returns the callback
		var findDogsInArray = function(array,callback){
		
			// if no array is passed in, let's send back an error
			if(!array) return callback("Error: required field missing", null);

			var dogsToReturn = new Array();

			array.forEach(function(i,e){
				if(e.type=="dog") dogsToReturn.push(e)
			})

			return callback(null,dogsToReturn);

		}

		// now, let's write a function that takes in array 
		// and says "Good Boy" to each of the elements
		var sayGoodBoy = function(array){
			array.forEach(function(i,e){
				console.log("Hi " + e.name);
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
				console.log("We have an error -->" + err);
			}
			else{
				var dogs = data;
				sayGoodBoy(dogs);
			}
		})


The Anatomy of a JS Program - Events
------------------------------------

Client-Side Events
------------------
events can be... timed, onload, onclick, onsubmit, onresize, onscroll, etc etc etc

preventDefault
--------------

Writing a Clean Program
-----------------------

