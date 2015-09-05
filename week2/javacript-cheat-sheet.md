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

It's often a good idea to comment the steps needed for a function before actually writing it:

	// step 1 - do this
	// step 2 - then, do this
	// step 3 - then, do this
	// step 4 - if this condition, do this; else, do this
	// step 5 - finally, do this 

Data Types / Variables
----------------------

JavaScript variables can hold many data types: 

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
	
	var names = ["Dan","Dave","Dexter"];
	names.push("Dante");

	console.log(names); // prints ["Dan", "Dave", "Dexter", "Dante"]

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

	var x = ["John","Joe","Jason"] // Now x is an array

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

	function describePet(name,age,gender){

		var genderPronoun = "she";
		if(gender=="male") genderPronoun = "he";

		console.log("This is " +name+ " and "+genderPronoun+" is "+age+" years old.")

		var humanYears = age*7;

		console.log("In human years, that's like "+humanYears+" years");

	}

	describePet("Joey",7,"male");

	describePet("Jill",4,"female");

Functions can return values

	var square = function(num) {
	  return num * num;
	};

	var num = square(2); // 4
	var num2 = square(7); // 49

	var joinNames = function(firstName,lastName){
		return firstName + " " + lastName;
	}

	var completeName = joinNames("Dan","Shiffman") // Dan Shiffman

Functions can take parameters and return values. This particularly useful when returning an object.



iteration

for()
forEach

comparisons

if/else and switch statements

rounding (ceiling, floor)

random 

undefined and null

typeOf

c
callbacks

the anatomy of a JS program... event based

events can be... onload, onclick, onsubmit, onresize, onscroll, etc etc etc

writing a clean program

common js examples...do this in conjunction with CV/resume example

adding/deleting from the DOM

dynamically/inserting CSS
