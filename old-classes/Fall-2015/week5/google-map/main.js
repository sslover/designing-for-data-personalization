// on load, get data
$( document ).ready(function() {

  $.ajax({
      url: 'https://hello-class.herokuapp.com/api/get',
      type: 'GET',
      failure: function(err){
        return alert(err);
      },
      success: function(data) {
        positionMap(); // let's position the map
        console.log(data);
        if(data.people.length>0) {
          buildMap(data.people, {map: document.getElementById('map-canvas')});
          buildLegend(data.people);
        }
      }
  });  

});


function buildMap (location, elements) {

  // Start of Map based stuff
  var getDefaultMapViewSettings = function(location) {
    return {
      center: location,
      zoom: 2,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      }
    };
  }

  var buildCircles = function(location, map) {
    return location.map(function(element) {
      var options = {
        strokeColor: '#572d88',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#572d88',
        fillOpacity: 0.7,
        map: map,
        center: new google.maps.LatLng(element.location.geo[1], element.location.geo[0]),
        radius: 25
      };
      return new google.maps.Circle(options);
    });
  }


  var center = new google.maps.LatLng(location[0].location.geo[1], location[0].location.geo[0]);

  var map = new google.maps.Map(elements.map, getDefaultMapViewSettings(center));

  var circles = buildCircles(location, map);

  circles.forEach(function(circle) {
    var p = Math.pow(2, (21 - map.getZoom()));
    circle.setRadius(p * 1128.497220 * 0.0027);    
  });


  google.maps.event.addListener(map, 'zoom_changed', function() {
    circles.forEach(function(circle) {
      var p = Math.pow(2, (21 - map.getZoom()));
      circle.setRadius(p * 1128.497220 * 0.0027);
    });
  });
}


function positionMap(){
  var width = $( window ).width();
  var height = $( window ).height();

  $( '#map-canvas' ).width(width);
  $( '#map-canvas' ).height(height);
}

function positionLegend(){
  var width = ($( window ).width())/5;
  var height = $( window ).height();

  $( '#map-legend' ).width(width);
  $( '#map-legend' ).height(height);  
}

// adjust map on window resize
$( window ).resize(function() {
  positionMap();
  positionLegend();
});

//End of Map

function buildLegend (data){
  positionLegend();
  data.forEach(function(e){
    $( '#map-legend' ).append('<div class="holder">'+
      '<strong>'+e.name + '</strong>'+
        '<ul>'+
          '<li class="purple">Home - ' + e.location.name+'</li>'+
        '</ul>'+
        'Data Interest - ' + e.dataInterest +
      '</div>'
    );
  })
}