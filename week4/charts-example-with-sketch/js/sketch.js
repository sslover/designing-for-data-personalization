var dinnerData;
var days = []; // an array to hold our day objects
var cookedImg, boughtImg; // image icons for cooked/bough

function preload() {
	dinnerData = loadJSON('data/data.json');
	cookedImg = loadImage("img/cooked.png");
	boughtImg = loadImage("img/bought.png");
}

function setup() {
	// set the width equal to the sketch-holder div width
	var canvasWidth = document.getElementById('sketch-holder').offsetWidth;
	var myCanvas = createCanvas(1200,800);
	myCanvas.parent('sketch-holder');
	createDays();
}

function draw() {
	background('#36394a');
	// display the days
	for(var i=0;i<days.length;i++){
		days[i].display();
		// check to see if the mouse is over
		// if so, set the boolean to display the status
		days[i].checkMouseOver(mouseX,mouseY)
	}
}

function createDays(){
	// loop through all the data and create Day objects
	var counter = 0; // we want 6 per row, so need to count
	var xPos = 0; // start it at 0
	var yPos = 0; // start it at 0
	var size = 200; // the width and height
	for(var i=0;i<dinnerData.length;i++){
		var d = new Day(dinnerData[i].date,dinnerData[i].status,xPos,yPos,size);
		// add it to the days array
		days.push(d);
		counter++;
		xPos += size;
		if(counter>6){
			counter = 0;
			xPos = 0; // reset xPos to 0 position
			yPos = yPos + size; // increment yPos;
		}
	}
	console.log(days);
}
// create our Day class
function Day(date,status,xPos,yPos,w){
	// data gets set based on the parameters that are passed in
	this.date = date;
	this.status = status;
	this.xPos = xPos;
	this.yPos = yPos;
	this.w = w; // width
	this.shouldDisplayStatus = false; // should we display status? initially set to false

	// display the information
	this.display = function(){
		fill(255);
		textSize(16);
		textAlign(CENTER);
		text(this.date, this.xPos + this.w/2, this.yPos + this.w/2);
		// if should display status, draw the correct icon
		if(this.shouldDisplayStatus){
			// first draw a rect to clear it
			fill('#36394a');
			noStroke();
			rect(this.xPos,this.yPos,this.w,this.w);
			fill('#fff')
			// now, let's draw the correct icon
			if(this.status=='cooked'){
				image(cookedImg, this.xPos + this.w/4, this.yPos + this.w/4);
				text('Cooked',this.xPos + this.w/2, this.yPos + this.w/1.2);
			}
			else if(this.status=='bought'){
				image(boughtImg, this.xPos + this.w/4, this.yPos + this.w/4);
				text('Bought',this.xPos + this.w/2, this.yPos + this.w/1.2);
			}		
		}
	}

	this.checkMouseOver = function(x,y){
		if(x >= this.xPos && x<= this.xPos+this.w && y >= this.yPos && y<= this.yPos+this.w){
			this.shouldDisplayStatus = true;
		}
		else this.shouldDisplayStatus = false;
	}


}