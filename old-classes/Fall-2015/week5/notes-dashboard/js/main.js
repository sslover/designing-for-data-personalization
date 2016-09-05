var notes = []; // a blank array that we'll use to hold our notes
var totalWords = 0; // how many words?
var totalNotes = 0; // how many notes?

// adds a note 
function addNote(){
	// first let's get the note text;
	var noteText = document.getElementById('noteText').value;
	if(!noteText || noteText=="") return alert('Enter a Note!');

	// now let's push the note into our notes array
	// it's a good idea to keep track of our data in our code
	notes.push(noteText);

	// now, let's actually add the note to our page
	addCard(noteText);

	// now, let's reset the textarea
	document.getElementById('noteText').value = '';

	// now let's deal with those stats
	totalNotes++; // increment the notes number by 1

	// get the stats for this note
	var wordCount = noteText.split(' ').length;
	totalWords+=wordCount; // increment the total wordcount

	// now, let's call the function to update the stats
	updateStats();
}

// add the note card
function addCard(text){
	$('#note-holder').append(
	  '<div class="col-md-4 card-holder">' +
	    '<div class="card">' +
	      '<p>'+text+'</p>' +
	    '</div>' +
	  '</div>'
		);
}

// updates the stats
function updateStats(){
	document.getElementById('totalNotes').innerHTML = totalNotes;
	document.getElementById('totalWords').innerHTML = totalWords;	
}

// resets the notes
function resetNotes(){
	notes = []; // empty the note array
	//remove the card html
	document.getElementById('note-holder').innerHTML = '';
	//update the stats
	totalWords = 0;
	totalNotes = 0;
	updateStats(); 
}

document.getElementById('add').addEventListener('click',addNote);
document.getElementById('reset').addEventListener('click',resetNotes);
