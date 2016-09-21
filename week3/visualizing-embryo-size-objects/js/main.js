var loadedJSON;
var pregancyData;
var embryos = []; // will hold our embryo objects
var startingEmbryo = 1; // startingEmbryo is 1 pixel
var redColor, yellowColor, greenColor;
var primaryColor = '#333647';

function preload() {
  var url = 'data/data.json';
  loadedJSON = loadJSON(url);
}

function setup() {
	pregancyData = loadedJSON.pregnancy;
	// log out pregnancy data to see it came in correct
	// console.log(pregancyData);
	// set minSize and maxSize
	createCanvas(windowWidth,windowHeight);
	background(primaryColor);
	redColor = color('#fa5f65');
	yellowColor = color('#fff600');
	greenColor = color('#04DCA2');
	
	createEmbryos();
	console.log(embryos);
}

function draw() {
	background('#333647');
	// loop through our embryos
	for(var i=0; i < embryos.length; i++){
		embryos[i].drawEmbryo();
		embryos[i].isActivated();
		if(embryos[i].isActive==true) embryos[i].showDetails();
	}
}

function createEmbryos(){
	// we need to loop through our pregancyData array, 
	// and create an embryo object for each week
	
	// starting locations
	var x = 100;
	var y = 60;
	// spacer
	var spacer = 150;

	for (var i = 0; i < pregancyData.length; i++) {
			embryos.push(new Embryo(pregancyData[i].week,pregancyData[i].fruit,pregancyData[i].inches,pregancyData[i].pounds, x, y));
			x+=spacer;
			// if we get to the end of a row, increase Y and reset x
			if(x>=windowWidth-50){
				x = 100;
				y+=spacer;
			}
		}	
}

// Embryo Class
function Embryo(week,fruit,inches,pounds,x,y){
	this.week = week;
	this.fruit = fruit;
	this.inches = inches;
	this.pounds = pounds;
	this.x = x;
	this.y = y;
	this.isActive = false;
	this.stomachSize = 100;

	// here we are setting the color using a self-executing anonymous function
	this.color = (function() {
		if(week<24) return redColor; // by default red
		if(week>=24&&week<26) return yellowColor;
		if(week>=26) return greenColor; 
	})(); 

	// here we are setting the size using a self-executing anonymous function
	this.size = (function(){
		if(!inches) return startingEmbryo;
		return map(inches, 0.13, 21, startingEmbryo, 100);
	})();

	// this function draws the embryo; 
	this.drawEmbryo = function(){
		noStroke();
		fill(this.color);
		ellipse(this.x,this.y,this.size,this.size);
		// let's add a stomach
		noFill();
		stroke(255,255,255);
		strokeWeight(0.2);
		ellipse(this.x,this.y,this.stomachSize,this.stomachSize);
	}

	// check if mouse is currently over
	this.isActivated = function(){
		//reset to false
		this.isActive = false;
		if(mouseX>=this.x-this.stomachSize && mouseX<=this.x+this.stomachSize && mouseY>=this.y-this.stomachSize && mouseY<=this.y+this.stomachSize){
			return this.isActive = true;
		}
		return this.isActive = false;
	}

	// show the information in a popup
	this.showDetails = function(){
		fill(255,255,255,200);
		ellipse(this.x,this.y,this.stomachSize,this.stomachSize);
		textAlign(CENTER);
		textSize(24);
		fill(primaryColor);
		text(this.week,this.x,this.y);
		textSize(14);
		text(this.fruit,this.x,this.y+18);
		textSize(10);
		if(this.inches) text(this.inches + ' inches',this.x,this.y+30);
	}

}


