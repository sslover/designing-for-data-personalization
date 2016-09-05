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
	// and we pass in the data object from above	
	var person = new Person(dataToSave);

	// now, we can save the above instance to the db
	person.save(function(err,data){
		// err
		if(err) console.log('we have error -> ' + err);

		// let's log out what just got saved
		console.log(data);
	})

	
Finding (Retriveing)
--------------------

We have many different ways of finding and returning docs in our database.

See http://mongoosejs.com/docs/queries.html

**findById**

findById allows us to find and return a single document in our db based on its id

	Person.findById(theIdWeWantToFind,function(err,data){
		// err
		if(err) console.log('we have error -> ' + err);

		// let's log out all the results
		console.log(data);		
	})

**findOne**

However, sometimes we'll want to find a single document based on a parameter other than its id. findOne allows us to do that:

	// let's find the person with name "Kevin Parker"
	Person.findOne({name:"Kevin Parker"},function(err,data){
		// err
		if(err) console.log('we have error -> ' + err);

		// let's log out the result
		console.log(data);	
	})

NOTE that if we have multiple "Kevin Parker" results in the above database, it would just return the first one.

**find** 

Find is used to find multiple documents that match a set of queries.

For example, to find all persons in our database (with no specific parameters), we could do:

	Person.find(function(err,data){
		// err
		if(err) console.log('we have error -> ' + err);

		// let's log out all the results
		console.log(data);
	})

But, if we wanted to include specific search queries, we could do the following:

	// this would return all results where the name matches Barack
	Person.find({name:"Barack"},function(err,data){
		// err
		if(err) console.log('we have error -> ' + err);

		// let's log out all the results
		console.log(data);
	})

One more:

	// this would return all females
	Person.find({gender:"female"},function(err,data){
		// err
		if(err) console.log('we have error -> ' + err);

		// let's log out all the results
		console.log(data);
	})	

But sometimes, we'll want even more-specific queries.
This is where the following commands can really help:

* Where - define specific parameters to search by
* Sort - sort the values that are returned by a property
* Limit - limit the number of results that are returned
* Skip - skip a certain number of results

Let's try it out, using a combination of these (you can use just 1 of these, or many of them together):

	// this would return all results where:
	// 1. the name field is equal to Sam
	// 2. the age is greater than 17, but less than 40
	// 3. the results returned are sorted by the name
	// 4. the results returnd are limited to just 5 result
	// 5. we skip the first 2 results

	Person
		.find()
		.where('name').equals('Sam')
		.where('age').gt(17).lt(40)
		.sort('-name')
		.limit(5)
		.skip(2)
		.exec(function(err,data){
			// err
			if(err) console.log('we have error -> ' + err);

			// let's log out all the results
			console.log(data);
	  })

A simpler example (remember, we can chain these however we want):

	// this would return all results where:
	// 1. name is equal to Sam
	// 2. the results are sorted by the name
	// 3. we limit to 15 results

	Person.find({name:"Sam"}).sort('-name').limit(15).exec(function(err,data){
			// err
			if(err) console.log('we have error -> ' + err);

			// let's log out all the results
			console.log(data);
	})

Updating (Editing)
==================

Update let's us find and update documents in our database.

**findByIdAndUpdate**

findByIdAndUpdate allows us to find and update a single document in our db based on its id

	// let's find a specific document and update its name and age

	var dataToUpdate = {
		name: "Maria",
		age: 28
	}

	Person.findByIdAndUpdate(theIdWeWantToFindAndUpdate, dataToUpdate, function(err,data){
			// err
			if(err) console.log('we have error -> ' + err);

			// let's log out all the updated data
			console.log(data);
	})

**findOneAndUpdate**

However, sometimes we'll want to find and update a single document based on a parameter other than its id. findOneAndUpdate allows us to do that:

	// let's find the user with name Daniel O'Sullivan, and change his name to Dano and his bio to "best chair"

	var dataToUpdate = {
		name: "Dano",
		bio: "Best Chair"
	}

	Person.findOneAndUpdate({name:"Daniel O'Sullivan"}, dataToUpdate, function(err,data){
			// err
			if(err) console.log('we have error -> ' + err);

			// let's log out all the updated data
			console.log(data);
	})

**update**

We can also update multiple documents at the same time. We do this using the update function.

For example, if we wanted to find and update every user with the name Sam, and make their bio "Best name evaaaah!"

	var dataToUpdate = {
		bio: "Best name evaaaah!"
	}

	Person.update({name:"Sam"},dataToUpdate,function(err,data){
			// err
			if(err) console.log('we have error -> ' + err);

			// let's log out all the updated data
			console.log(data);
	})

Or, let's say we wanted to run a command that updates EVERY person in our database.

	var dataToUpdate = {
		imageUrl: "https://cdn0.vox-cdn.com/images/verge/default-avatar.v9899025.gif"
	}

	Person.update({},dataToUpdate,function(err,data){
			// err
			if(err) console.log('we have error -> ' + err);

			// let's log out all the updated data
			console.log(data);
	})

Removing (Deleting)
===================

We can also remove documents.

**findByIdAndRemove**

Removes a document based on its id:

	// Mongoose method to remove, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove

	Person.findByIdAndRemove(idWeWantToRemove,function(err, data){
			// err
			if(err) console.log('we have error -> ' + err);

			// let's log out all the updated data
			console.log(data);
	})

**findOneAndRemove**

Removes a document based on a given parameter:

	// let's remove the document where name is "Sam Slover"
	Person.findOneAndRemove({name:"Sam Slover"},function(err, data){
			// err
			if(err) console.log('we have error -> ' + err);

			// let's log out all the updated data
			console.log(data);
	})

**remove**

Removes all documents that match a given parameter

	// let's remove all documents where gender is male
	Person.remove({gender:"male"},function(err, data){
			// err
			if(err) console.log('we have error -> ' + err);

			// let's log out all the updated data
			console.log(data);
	})

A slightly different way of doing it:

	// let's remove all documents where age is greater than 20
	Person.remove().where('age').gt(20).exec(function(err,data){
		// err
		if(err) console.log('we have error -> ' + err);

		// let's log out all the results
		console.log(data);
	})

Or, if you're really feeling crazy, remove all docs

	Person.remove({},function(err,data){
			// err
			if(err) console.log('we have error -> ' + err);

			// let's log out all the updated data
			console.log(data);		
	})