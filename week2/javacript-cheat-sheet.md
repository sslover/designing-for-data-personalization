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

It's often a good idea to comment the steps needed for a function before actually coding it.

	// step 1 - make a request for data
	// step 2 - when data returns, pass into a function that renders a map with the data
	// step 3 - in that function, 

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

JavaScript has dynamic types. This means that the same variable can be used as different types:

	var x;               // Now x is undefined
	var x = 5;           // Now x is a Number
	var x = "John";      // Now x is a String

	var x = {
		age: 5,
		name: "John"
	} // Now x is an Object

	var x = ["John","Joe","Jason"] // Now x is an array

functions (2 ways of declaring)

iteration

comparisons

if/else and switch statements

casting (toString, etc)

rounding (ceiling, floor)

random 

undefined and null

return

typeOf

built-in functions (forEach)

callbacks

the anatomy of a JS program... event based

events can be... onload, onclick, onsubmit, onresize, onscroll, etc etc etc

writing a clean program

common js examples...do this in conjunction with CV/resume example

adding/deleting from the DOM

dynamically/inserting CSS
