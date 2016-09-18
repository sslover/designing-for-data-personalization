function init(){
	// on page load, we want to ask our JSON file for all the locations
	// we've lived in in the past; then render each one
	// make a request for our own JSON file
	$.ajax({
	    url: './data/sam.json',
	    type: 'GET',
	    failure: function(err){
	    	return console.log ("There was an issue getting the data");
	    },
	    success: function(response) {
	      console.log('the response from our JSON is -- >');
	      console.log(response);
	      // let's create an array to store our location
	      var placesToRender = [];

	      // first, let's put in the array of otherLocations I've been to	      
	      placesToRender = response.facts.otherLocations

	      // but I also want my home location and current location
	      // let's push them into the array
	      placesToRender.push(response.facts.bornLocation);
	      placesToRender.push(response.facts.currentLocation);

	      // log out our places
	      console.log("we are going to render these places: --> " + placesToRender);

	      // now, let's get the weather for reach one
	      placesToRender.forEach(function(e){
	      	geoCodeIt(e);
	      })
	    }
	});	
}

function getWeather(event){

	var val = document.getElementById('theInput').value;
	// if there is no value, or it is an empty string, prompt the user
	if(!val || val=="") return alert("Enter a Location");
	console.log("the value is " + val);	
	// else, need to geocode it 
	geoCodeIt(val)
}

function geoCodeIt(location){

	var apiKey = 'AIzaSyCIxywgknotMlV6Kjqn-HbJgQBkSAMPOlU';

	// make a request to geocode the location
	$.ajax({
	    url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key='+apiKey,
	    type: 'GET',
	    failure: function(err){
	    	return alert ("Could not find that location");
	    },
	    success: function(response) {
	      console.log('the geocode response is -- >');
	      console.log(response);
	      
	      if(response.status=="ZERO_RESULTS") return alert ("Could not find that location");

	      // now that we have the lat/lon details, can get the weather
	      var lat = response.results[0].geometry.location.lat;
	      var lon = response.results[0].geometry.location.lng;
	      return getTheWeatherAPI(location, lat, lon);
	    }
	});
}

function getTheWeatherAPI(location, lat, lon){

	//forecast apiKey
	var apiKey = "a345a0f8bba13003d1bb79fa4fad60d6";

	// make a request to get the current weather details for the lat/lon
	$.ajax({
	    url: 'https://api.forecast.io/forecast/'+apiKey+'/'+lat+','+lon,
	    type: 'GET',
	    dataType: "jsonp", // need to specify this
	    success: function(response) {
	      console.log('the weather response is -- >');
	      console.log(response);
	      // now that we have the weather details, we can build the card
	      var status = response.currently.summary;
	      var temp = Math.round(response.currently.temperature);
	      var icon = response.currently.icon;

	      // reset the input value
	      document.getElementById("theInput").value = '';

	      // add the card
	      return addCard(location, status, temp, icon);
	    }
	});

}

function addCard(location, status, temp, icon){

	var htmlToAppend = 
	'<div class="card-container col-sm-4 col-md-4 centered">'+
		'<div class="card">'+
		  '<img src="img/'+icon+'.png">'+
		    '<h1>'+location+'</h1>'+
		    '<h2>'+temp+'&#176; / '+status+'</h2>'+
	  '</div>'+
	'</div>';

  return $('#card-holder').prepend(htmlToAppend);
}

document.getElementById('theInput').addEventListener('change', getWeather);
window.addEventListener('load', init);

