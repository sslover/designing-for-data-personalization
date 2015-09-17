var presidents = []; // the array of presidents we get from the json request
var stats = {}; // an empty object; 
// we will fill the stats object with: youngestToTakeOffice; oldestToTakeOffice; longestLife; shortestLife; 

var bgColor = '#FDFBEE';
var darkBlue = '#3B4269';
var lightBlue = '#91B3BC';
var brightRed = '#DC224C';

function preload() {
  var url = 'https://raw.githubusercontent.com/hitch17/sample-data/master/presidents.json';
  presidents = loadJSON(url);
}

function setup() {
	var width = document.getElementById('chart-holder').offsetWidth;
	var myCanvas = createCanvas(width,2500);
	myCanvas.parent('chart-holder')
	background(bgColor)
  determineAgeStats();
  drawChart();
  buildStatCards();
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
	console.log(presidents);

	// compute our stats object
	stats.youngestToTakeOffice = findLowValue(presidents,"took_office_age","Youngest To Take Office");
	stats.oldestToTakeOffice = findHighValue(presidents,"took_office_age","Oldest To Take Office");
	stats.shortestLife = findLowValue(presidents,"death_age","Shortest Life");
	stats.longestLife = findHighValue(presidents,"death_age","Longest Life");	
}

function findLowValue(arr,fieldToSort,label){

	//initially set the default to a value very high
	// every time a value is lower, it is the new low value
	var lowestValue = 999;
	var lowestValueObj; // the object we want to return
	for(var i=0;i<arr.length;i++){
		if(arr[i][fieldToSort]<lowestValue) {
			// reset the lowest value to this value
			lowestValue = arr[i][fieldToSort];
			// create the lowest value object
			lowestValueObj = {
				value: arr[i][fieldToSort],
				name: arr[i]['president'],
				label: label
			}
		}
		else continue; // continue to the next one
	}

	return lowestValueObj;
}

function findHighValue(arr,fieldToSort,label){
	//initially set the default to a value very low
	// every time a value is higher, it is the new high value
	var highestValue = 0;
	var highestValueObj; // the object we want to return
	for(var i=0;i<arr.length;i++){
		if(arr[i][fieldToSort]>highestValue) {
			// reset the highest value to this value
			highestValue = arr[i][fieldToSort];
			// create the lowest value object
			highestValueObj = {
				value: arr[i][fieldToSort],
				name: arr[i]['president'],
				label: label
			}
		}
		else continue; // continue to the next one
	}

	return highestValueObj;
}

function buildStatCards(){
	var objectKeys = Object.keys(stats); // an array of our object keys
	for(var i=0; i<objectKeys.length; i++){
			var label = stats[objectKeys[i]].label;
			var president = stats[objectKeys[i]].name;
			var value = stats[objectKeys[i]].value;

			var htmlToAppend = 
			'<div class="card-container col-sm-3 col-md-3 centered">'+
				'<div class="card">'+
						'<p class="label">'+label+'</p>'+
				    '<h1>'+value+'</h1>'+
				    '<h2>'+president+'</h2>'+
			  '</div>'+
			'</div>';

			// now use those values to build a car
			$('#stats-holder').append(htmlToAppend);
	}
}