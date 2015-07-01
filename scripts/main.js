var map;

function initialize() {
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(39.79, -86.14)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  
}

google.maps.event.addDomListener(window, 'load', initialize);

