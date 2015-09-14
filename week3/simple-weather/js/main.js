var weather;

function preload() {
  var url = 'http://api.openweathermap.org/data/2.5/forecast?q=NewYork,USA&units=imperial';
  weather = loadJSON(url);
}

function setup() {
	console.log(weather);
	createCanvas(windowWidth,windowHeight);
	background(255);
}

function draw() {
	// do something really simple
	// let's set the background based 
	// want equal width squares based on the number of values returned
	// but let's only do half the values returned, to make it more readable
	var w = width/(parseInt(weather.list.length/2)); 
	var xPos = 0; // the xposition, need to increment by w each time
	for(var i=0;i<(parseInt(weather.list.length/2));i++){
		// let's map RGB to the max temp
		var temp = parseInt(weather.list[i].main.temp);
		var rValue = map(temp,50,90,0,255);
		var gValue = map(temp,50,90,0,255);
		var bValue = map(temp,50,90,255,0);
		// draw the rectangle
		noStroke();
		fill(rValue,gValue,bValue);
		rect(xPos,0,w,height);
		// write the temp
		fill(255);
		textSize(30);
		text(temp,xPos+w/3,height/2);
		textSize(12);
		// write the date
		text(weather.list[i].dt_txt.substring(5, 11),xPos+w/3,height/2 + 20);
		// write the time
		text(weather.list[i].dt_txt.substring(11, 16),xPos+w/3,height/2 + 35);
		xPos += w;
	}
}