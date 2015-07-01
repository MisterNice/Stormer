// heatmap
"use strict";
var geocoder;
var heatMap;
var pointArray =[];
var heatmap;
var address = document.getElementById('address').value;
var distance = document.getElementById('distance').value;
var searchFor = document.getElementById('searchFor').value;
var mapOptions = {
        zoom: 12
      };    
    heatMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    function codeAddress() {

        geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                heatMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
            var lat = results[0].geometry.location.lat();
               // alert('setInsta lat' + lat);
                var lng = results[0].geometry.location.lng();
              //  alert('setInsta lng' + lng);
                var latURL = "&lat=" + lat;
               // alert('setInsta latURL' + latURL);
                var lngURL = "&lng=" + lng;
               // alert('setInsta lngURL' + lngURL);
                var distanceURL = "&distance=" + distance; //distance in meters
              //  alert('setInsta distanceURL' + distanceURL);
                var instagramUrl = "https://api.instagram.com/v1/media/search?";
                var accessToken = "&access_token=225711713.1fb234f.6e46b96c04ed4f4b81ceb212c3e638fb";
                var howMany = "&count=100";
                var instaURL = instagramUrl + latURL + lngURL + distanceURL + accessToken + howMany;

                $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        cache: false,
                        url: instaURL,
                        success: function (response) {
                        if(response.meta.code == '200'){
                            } else {
                        alert('error');
                        callback(response.data[i]);
                        }
                            
                        var search = searchFor; 
                            console.log(search);
                        for (var i = 0; i < response.data.length; i++) {
                            
                            var instaTag = response.data[i].tags;
   
                            console.log(instaTag);// get the array of tags (might be empty)
                            if (instaTag.indexOf(search) >= 0){ //search Array for a string
                                
                            var instaLat = response.data[i].location.latitude;
                            var instaLng = response.data[i].location.longitude;
                            var latlng = new google.maps.LatLng(instaLat, instaLng);
                            pointArray.push(latlng); //create the heatmap points
							
							//create html image
							var url = '<li><img src="' + response.data[i].images.low_resolution.url + '" alt="' + instaTag + '"></img></li>';
							//var title = instaTag " , " + 
                            
                            $(".instapic").append(url);
                                
                            }//close if statement
                              else {
                                console.log('No Results in ' + i);
                              }
                            

                            } //close for loop
                             heatmap = new google.maps.visualization.HeatmapLayer({
                             data: pointArray  //create the heatmap overlay
                             });
                            heatmap.setMap(heatMap); //put the heatmap overlay on the map (heatMap)
                        } // close success function
                    
        
                }); //close ajax
                

                
             } // close if statemet
            else {
                        alert('Geocode was not successful for the following reason:' + status); }
        }); // close geocoder
    

    
    } //close codeAddress
                           
    



//THESE FUNCTIONS CONTROL THE HEATMAP

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : heatMap);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ];
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}
