var data; // our data; we will get it from our JSON with loadJSON
var images = []; // an array that will hold our images
var foods = []; // an array that will hold our food instances
var buttons = []; // an array that will hold our button instances
var buttonLabels = ['Calories', 'Carbs', 'Fat', 'Protein']; // the labels for our buttons
var shouldShowStats = false; // should we be showing the stats on top of the products
var currentStat; // the current stat to show

function preload() {
	// set data to the data in our json folder
	data = loadJSON('data/foods.json'); 
}

function setup() {
	createCanvas(1200,1050);
	createButtons();
	createFoods();
}

function draw() {
	// do something
	background(255);
	for(var i=0;i<foods.length;i++){
		// display all the foods
		foods[i].display();
		// should we be showing the stats?
		if(shouldShowStats) foods[i].showStats();
	}	
	// draw the buttons
	for(var i=0;i<buttons.length;i++){
		buttons[i].display();
	}
}

function mousePressed() {
	// check if a button is clicked
	// we do this by looping through all the buttons,
	// and seeing if the mouse is over that location
	for(var i=0;i<buttons.length;i++){
		var buttonResult = buttons[i].isOver(mouseX,mouseY);
		if(buttonResult){
			// this means the button has been clicked and we have a value
			buttonResult = buttonResult.toLowerCase(); // makes it lower case
			// now, let's set the shouldShowStats = true, so that the stats get drawn in the draw loop
			shouldShowStats = true;
			// now let's set the current stat to the button we clicked on
			currentStat = buttonResult;
		}
	}
  // prevent default
  return false;
}

function createButtons(){
	// let's create our buttons
	var buttonXPos = 50; // the starting X location point
	var buttonYPos = 50; // the starting Y location point
	var increment = 250; // the amount to increment each time
	for(var i=0;i<buttonLabels.length;i++){
		buttons[i] = new Button(buttonXPos,buttonYPos,200,50,'#5bb6d5',buttonLabels[i]);
		buttonXPos += increment; // increment x location
	}	
}

function createFoods(){
	// now, need to loop through the all our data
	// 1. load all the images
	// 2. create all our food instances
	var xPos = 0; // the starting X location point
	var yPos = 150; // the starting Y location point
	var width = 300; // the width of the square; the amount we want to increment each time
	for(var i=0;i<data.length;i++){
		// load the image for the food in the p5 format
		images[i] = loadImage("img/"+data[i].img);
		// create the food instance, 
		// passing in the data and the image for that food
		foods[i] = new Food(data[i],images[i],xPos,yPos,width);
		// increment the locations by the width
		xPos += width;
		if(xPos+width>width*4) {
			xPos = 0; // if it gets above 4 in a row, xPos goes to back to 0
			yPos += width; // yPos gets incremented to the next row
		}
	}	
}

// our food class 
// takes an object, an image, an x location, and a y location
function Food(obj,img,x,y,width){
	this.name = obj.name;
	this.color = obj.color;
	this.nutrition = obj.nutrition;
	this.img = img;
	this.x = x;
	this.y = y;
	this.w = width; // each one is a square with width/height of 300

	this.display = function(){
		noStroke();
		fill(this.color);
		rect(this.x,this.y,this.w,this.w);
		// we want the image to be a little smaller than its background and centered
		image(this.img,this.x+50,this.y+50,this.w-100,this.w-100)
	}

	this.showStats = function(){
		// first draw a semi-transparent rectangle on top
		noStroke();
		fill('rgba(0,0,0, 0.5)');
		rect(this.x,this.y,this.w,this.w);
		// now draw the values
		fill(255);
		// draw a label in top left
		textSize(14);
		text(currentStat,this.x+15,this.y+25);
		// draw the value in middle
		textSize(40);
		text(this.nutrition[currentStat].dailyValuePercent + '% DV',this.x+75,this.y+150)
		// draw the chart in middle
		var chartWidth = 250;
		fill('rgba(255,255,255, 0.5)');
		rect(this.x+25,this.y+175, chartWidth,10);
		fill(255);
		chartWidth = map(this.nutrition[currentStat].dailyValuePercent,0,100,0,chartWidth);
		rect(this.x+25,this.y+175, chartWidth,10);		
	}
}

function Button(x,y,width,height,hex,label){
	this.x = x;
	this.y = y;
	this.w = width;
	this.h = height;
	this.color = hex;
	this.label = label;

	this.display = function(){
		noStroke();
		fill(this.color);
		rect(this.x,this.y,this.w,this.h,4); // 4 is rounded corners
		textSize(18);
		textAlign(CENTER);
		fill('#ffffff');
		text(this.label,this.x+this.w/2,this.y+this.h/1.75);
	}

	// checks to see if the current mouse location is over the button
	// if so, returns that buttons' label as a reference
	// else returns null
	this.isOver = function(xPos,yPos){
		if(xPos >= this.x && xPos <= this.x+this.w && yPos >= this.y && yPos <= this.y+this.h){
			return this.label;
		}
		else return null;
	}

}