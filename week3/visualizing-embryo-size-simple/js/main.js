var loadedJSON;
var pregancyData;
var startingEmbryo = 1; // startingEmbyro is 1 pixel
var redColor, yellowColor, greenColor;

function preload() {
  var url = 'data/data.json';
  loadedJSON = loadJSON(url);
}

function setup() {
	pregancyData = loadedJSON.pregnancy;
	// log out pregnancy data to see it came in correct
	console.log(pregancyData);
	// set minSize and maxSize
	createCanvas(windowWidth,1000);
	background('#333647');
	redColor = color('#fa5f65');
	yellowColor = color('#fff600');
	greenColor = color('#04DCA2');

	drawEmbryos();
}

function draw() {
	// nothing to do
}

function drawEmbryos(){

	var xPos = 100;
	var yPos = 100;

	var offset = 150;

	pregancyData.forEach(function(e){
		var embryoSize = computeEmbryo(e.inches)

		noStroke();
		fill(redColor); // by default red
		if(e.week>=24&&e.week<26)fill(yellowColor);
		if(e.week>=26)fill(greenColor);

		
		// draw the embryo
		ellipse(xPos,yPos,embryoSize,embryoSize);
		xPos+=offset;
		if(xPos>= windowWidth-50) {
			yPos+=offset;
			xPos = 100;
		}
	})
}

function computeEmbryo(size){
	if(!size) return startingEmbryo;

	return map(size, 0.13, 21, startingEmbryo, 100);
}




