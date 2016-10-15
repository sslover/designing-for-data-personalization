document.getElementById('getNews').addEventListener('click', showOverlay);
document.getElementById('close-icon').addEventListener('click', hideOverlay);

var news; // variable to hold the news data that is returned
var showNews = false; // should we be showing the news in draw?
var newsObjects = [];
var backgroundColor = 'rgba(255,255,255,0.9)' // the background color of sketch
var lastTime; // variable to track when we've clicked to see the news
var currentNewsElement = 0; // variable to track the news article we are on

function setup() {
	var myCanvas = createCanvas(windowWidth,windowHeight);
	myCanvas.parent('canvas-holder');
	background(backgroundColor);
}

function draw() {
	background(backgroundColor);	
	// if no news to being draw, just draw the white background and return
	if(!showNews){
		return;
	}
	else{
		createNews();
		displayNews();
	}
}

function showOverlay(){
	var overlay = document.getElementById('canvas-holder');
	overlay.style.zIndex = 1;
	var closeButton = document.getElementById('close-icon');
	closeButton.style.display = 'block';
	lastTime = millis();
	getNYTData("2016 Election");	
}

function hideOverlay(){
	// set showNews to false
	showNews = false;
	// code to hide the overlay
	var overlay = document.getElementById('canvas-holder');
	overlay.style.zIndex = -1;
	var closeButton = document.getElementById('close-icon');
	closeButton.style.display = 'none';
	// set clickTime back to null
	lastTime = null;
}

function getNYTData(query){
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	  'q': query,
	});

	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(result) {
	  console.log(result);
	  news = result.response.docs;
	  showNews = true;
	}).fail(function(err) {
	  throw err;
	});	
}

function createNews(){
	if(currentNewsElement==0){
		newsObjects.push(new News(news[currentNewsElement].headline.main,news[currentNewsElement].snippet));
		currentNewsElement++;
	}
	// if it's been more than 7 seconds
	if(millis()-lastTime>=7000){
		// create a news Object
		newsObjects.push(new News(news[currentNewsElement].headline.main,news[currentNewsElement].snippet))
		currentNewsElement++;
		if(currentNewsElement>=news.length){
			currentNewsElement = 0; // reset it if we're done with the news
		}
		lastTime = millis(); // reset to lastTime to millis to track
	}
}

function displayNews(){
	newsObjects.forEach(function(e){
		e.display();
	})
}

function News(headline,snippet){
	this.headline = headline;
	this.snippet = snippet;
	this.x = windowWidth/2;
	this.y = windowHeight;

	this.display = function(){
		if(this.y<-50) return; // no need to display if off screen

		textFont("Helvetica");
		textAlign(CENTER);
		fill('#222');
		textSize(38);
		text(this.headline, this.x, this.y);
		textSize(16);
		text(this.snippet, this.x, this.y+30);

		this.y -= 0.75; // every frame, move it up the screen
	}
}


