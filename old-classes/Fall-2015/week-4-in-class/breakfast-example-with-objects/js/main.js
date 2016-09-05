var foods;
var foodObjArray = [];

function preload() {
	//use this to load assets like data -> loadJSON(), images -> loadImage(), etc
	foods = loadJSON('data/data.json');
}

function setup() {
	//console.log(foods);
	createCanvas(windowWidth,windowHeight);
	createFoodObjects();
}

function draw() {
	background(0);
	fill(255);
	
	// var yPos = 20;
	// var increment = 50;
	// for(var i=0;i<foods.length;i++){
	// 	// maps from one value range to another
	// 	var w = map(foods[i].nutrition.calories.total,0,1000,0,width)
	// 	rect(0,yPos,w,10);
	// 	textSize(12);
	// 	textAlign(LEFT);
	// 	text(foods[i].name,0,yPos+25);
	// 	textAlign(RIGHT);
	// 	text(foods[i].nutrition.calories.total + ' calories',w,yPos+25);
	// 	yPos += increment;
	// }

	for(var i=0;i<foodObjArray.length;i++){
		foodObjArray[i].display();
		foodObjArray[i].isMouseOver(mouseX,mouseY);
	}
}

function createFoodObjects(){

	var xPos = 0;
	var yPos = 0;
	var size =  200;
	for(var i=0;i<foods.length;i++){
		var f = new Food(foods[i].name,foods[i].color,foods[i].img,foods[i].nutrition,xPos,yPos,size);
		// push into foodObjArray array
		foodObjArray.push(f);
		xPos += size;
		if(xPos >= width){
			xPos = 0;
			yPos += size;
		}
	}

	console.log(foodObjArray);

}

function Food(name,colorHex,img,nutrition,xPos,yPos,size){
	this.name = name;
	this.colorHex = colorHex;
	this.img = img;
	this.nutrition = nutrition;
	this.xPos = xPos;
	this.yPos = yPos;
	this.size = size;
	this.shouldShowNutrition = false;

	this.display = function(){
		fill(this.colorHex);
		noStroke();
		rect(this.xPos,this.yPos,this.size,this.size);
		textSize(16);
		fill(255);
		if(this.shouldShowNutrition){
			textSize(30);
			text(this.nutrition.calories.total + ' cals',this.xPos+this.size/6,this.yPos+this.size/2);
		}
		if(!this.shouldShowNutrition){
			text(this.name,this.xPos+this.size/6,this.yPos+this.size/2);
		}
	}

	this.isMouseOver = function(mx,my){
		if(mx>=this.xPos && mx<=this.xPos+this.size && my>=this.yPos && my<=this.yPos+this.size){
			this.shouldShowNutrition = true;
		}
		else this.shouldShowNutrition = false;
	}

}























