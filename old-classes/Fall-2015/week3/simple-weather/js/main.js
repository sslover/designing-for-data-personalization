var weather;

function preload() {
  var url = 'http://api.openweathermap.org/data/2.5/forecast?q=NewYork,USA&units=imperial';
  weather = loadJSON(url);
}

function setup() {
	console.log(weather);
	createCanvas(windowWidth,windowHeight);
}

function draw() {
	background(255);
	// do something really simple
	// let's set the background based on the temp
	// want equal width squares based on the number of values returned
	// but let's only do half the values returned, to make it more readable
	var w = windowWidth/(parseInt(weather.list.length/2)); 
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
		var date = weather.list[i].dt_txt.substring(5, 11); //gives us the data from the string
		text(date,xPos+w/3,height/2 + 20);
		// write the time
		var time = weather.list[i].dt_txt.substring(11, 16); // gives us the time from the string
		text(time,xPos+w/3,height/2 + 35);
		// increment the x position so the next rectangle moves over
		xPos += w;
	}
}