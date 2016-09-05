var presidents = []; // the array of presidents we get from the json request

var bgColor = '#FDFBEE';
var darkBlue = '#3B4269';
var lightBlue = '#91B3BC';
var brightRed = '#DC224C';

function preload() {
  var url = 'https://raw.githubusercontent.com/hitch17/sample-data/master/presidents.json';
  presidents = loadJSON(url);
}

function setup() {
	console.log(presidents);
	// set the width equal to the chart-holder div width
	var width = document.getElementById('chart-holder').offsetWidth;
	
	var myCanvas = createCanvas(width,2500);
	myCanvas.parent('chart-holder'); // set the chard-holder as the parent

	background(bgColor)
  determineAgeStats();
  drawChart();
	noLoop();
}

function draw() {
 // we are not doing anything with user interactions, so no need to loop
}

function drawChart(){
	// let's draw the chart

	var yPosition = 25; // the initial Y position; will increment it each time
	var yIncrement = 55; // the amount of space we want to increment each time
	for (var i=0; i<presidents.length; i++){

		// first draw a background bar; helps with visibility
		noStroke();
		fill(lightBlue);
		rect(0,yPosition,width,10);

		// now draw the data bars on top of the background bar
		// the first bar will denote the age they died
		// need to map the width
		var w1 = map(presidents[i].death_age, 0, 100, 0, width);
		fill(brightRed);
		rect(0,yPosition,w1,10);

		// the second bar will denote the age they took office
		var w2 = map(presidents[i].took_office_age, 0, 100, 0, width);
		fill(darkBlue);
		rect(0,yPosition,w2,10);

		// now draw the labels
		fill(darkBlue);		
		textSize(12);
		// the name label
		textAlign(LEFT);
		text(presidents[i].president, 0, yPosition+25);

		// the age at death label
		textAlign(CENTER);
		if(presidents[i].death_age){
			text(presidents[i].death_age, w1, yPosition+25);
			text("Died", w1, yPosition+40);
		}
		// the age at office label
		if(presidents[i].took_office_age){		
			text(presidents[i].took_office_age, w2, yPosition+25);
			text("Took Office", w2, yPosition+40);
		}

		// finally increment the y position for the next row
		yPosition += yIncrement;
	}
}

function determineAgeStats(){

	// for each one, let's get their death age and the age they took office
	for(var i=0;i<presidents.length;i++){
		// let's compute the death age, but only if they've actually died
		if(presidents[i].death_year) {
			presidents[i].death_age = presidents[i].death_year - presidents[i].birth_year;
		}
		// now let's compute the age they took office
		// first, we need to get the year from the took_office string
		var tookOfficeYear = parseInt(presidents[i].took_office.substring(0, 4));
		// now subtract the birthYeah from the tookOfficeYear
		presidents[i].took_office_age = tookOfficeYear - presidents[i].birth_year;
	}
}