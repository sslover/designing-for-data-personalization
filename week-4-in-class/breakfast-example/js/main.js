var foods;

function preload() {
	//use this to load assets like data -> loadJSON(), images -> loadImage(), etc
	foods = loadJSON('data/data.json');
}

function setup() {
	console.log(foods);
	createCanvas(windowWidth,windowHeight);
}

function draw() {
	background(0);
	fill(255);
	
	var yPos = 20;
	var increment = 50;
	for(var i=0;i<foods.length;i++){
		// maps from one value range to another
		var w = map(foods[i].nutrition.calories.total,0,1000,0,width)
		rect(0,yPos,w,10);
		textSize(12);
		textAlign(LEFT);
		text(foods[i].name,0,yPos+25);
		textAlign(RIGHT);
		text(foods[i].nutrition.calories.total + ' calories',w,yPos+25);
		yPos += increment;
	}

}









