function getWeather(event){

	var val = document.getElementById('theInput').value;
	// if there is no value, or it is an empty string, prompt the user
	if(!val || val=="") return alert("Enter a Location");
	console.log("the value is " + val);	
	// else, need to geocode it 
	geoCodeIt(val);
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
	      var icon = response.currently.icon;
	      var temp = Math.round(response.currently.temperature);

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