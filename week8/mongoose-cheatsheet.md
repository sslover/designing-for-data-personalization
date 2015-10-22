Mongoose Cheat Sheet
============================================

Common methods for interacting with Mongodb via Mongoose.

There are 4 core activities you'll do when interacting with your database:
* Creating
* Retrieving
* Updating
* Deleting

When retrieving documents, there's also some goodies that allow you to make smarter, more-specific queries:
* Where - define specific attributes to search by
* Sort - sort the values that are returned by a property
* Limit - limit the number of results that are returned
* Skip - skip a certain number of results

All the below examples assume the following Schema (in our models file):

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	// See http://mongoosejs.com/docs/schematypes.html

	var personSchema = new Schema({
		name: String,
		age: Number,
		gender: String,
		bio: String,
		imageUrl: String,
		dateAdded : { type: Date, default: Date.now },
	})

	// export 'Person' model so we can interact with it in other files
	module.exports = mongoose.model('Person',personSchema);
	
And that the following has been declared at the top of our routes file (index.js)

	// our db model
	var Person = require("../models/model.js");	

Creating (Saving)
-----------------

**Save**

See http://mongoosejs.com/docs/api.html#model_Model-save

To save a document, you call the .save() method

	// First, we create a data object of the fields we want to save
	var dataToSave = {
		name: "Barack",
		age: 54,
		gender: "male",
		bio: "President of the United States",
		imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/440px-President_Barack_Obama.jpg"
	}

	// now we need to create an instance of the Schema/model
	// We pass in the data object from above	
	var person = new Person(dataToSave);

	// now, we can save the above instance to the db
	person.save(function(err,data){
		// err
		if(err) console.log('we have error -> ' + err);

		//
		console.log(data);
	})

	
Finding (Retriveing)
--------------------

We have many different ways of finding docs in our database.

**find** 

findById

findOne

Updating (Editing)

update

findOneAndUpdate

findByIdAndUpdate

Removing (Deleting)

findByIdAndRemove

findOneAndRemove

Other goodies

sort

limit

skip


