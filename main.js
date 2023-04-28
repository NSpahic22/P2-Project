// Global variables needed for busstops
let directionDisplay;
let directionsService;
let map;
let polyline = null;
let gmarkers = [];
let infowindow = new google.maps.InfoWindow();
let markerIcons = new Array();
markerIcons["red"] = {
  url: "http://maps.google.com/mapfiles/ms/micons/red.png"
};

let totalDuration;

//This is function is called with our API key
function initMap () {
    //Assigning google functions
    const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
    });
    const directionsService = new google.maps.DirectionsService();
    const transitLayer = new google.maps.TransitLayer();
    const trafficLayer = new google.maps.TrafficLayer();
    //Creates maps
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: {lat:57.04, lng: 9.93},
    });
    //The button that turns traffic on and off  
    const Traffic = document.getElementById("Traffic");
    Traffic.addEventListener("click", () => {
        if (Traffic.checked === true) {
            trafficLayer.setMap(map);
        }
        else {
            trafficLayer.setMap();
        }
    });

    //The button that turns the points of intrest on and off
    const pointsofintrest = document.getElementById("Pointsofintrest");
    pointsofintrest.addEventListener("click", () => {
        if (pointsofintrest.checked === true) {
            map.setOptions({
                styles:styles["default"]
            });
        }
        else {
            map.setOptions({
                styles:styles["hide"]
            }); 
        };
    });
    //Hides different points of intrest that just cause flodder when sites first loads
    map.setOptions({
        styles: styles["hide"]
    });

    // === A method which returns an array of GLatLngs of points a given interval along the path ===
google.maps.Polyline.prototype.GetPointsAtDistance = function(metres) {
  let next = metres;
  let points = [];
  // some awkward special cases
  if (metres <= 0) return points;
  let dist = 0;
  let olddist = 0;
  for (let i = 1;
    (i < this.getPath().getLength()); i++) {
    olddist = dist;
    dist += google.maps.geometry.spherical.computeDistanceBetween(this.getPath().getAt(i), this.getPath().getAt(i - 1));
    while (dist > next) {
      let p1 = this.getPath().getAt(i - 1);
      let p2 = this.getPath().getAt(i);
      let m = (next - olddist) / (dist - olddist);
      points.push(new google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m));
      next += metres;
    }
  }
  return points;
}

    /*
    //Makes the already existing routes. (HAS BEEN PUT ON PAUSED,
    TO SEE IF BETTER ALTERNATIVE IS AVALIABLE)
    const routea = new google.maps.Polyline({
        path: route1,
        geodesic: true,
        strokeColor: "#0000FF",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        interpolate: true,
    });
    routea.setMap(map);

    const routeb = new google.maps.Polyline({
        path: route2,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        interpolate: true,
    });
    routeb.setMap(map);
    */

    //Sets map onto our site 
    directionsRenderer.setMap(map);
    transitLayer.setMap(map); 
    
    //Adds eventlistener to the submit button for the addresses
    document.getElementById("mode").addEventListener("click", () => {
        caluclateAndDisplayRoutes(directionsService, directionsRenderer);
    });
    document.getElementById("morestopbutton").addEventListener("click", () => {
        caluclateAndDisplayRoutes(directionsService, directionsRenderer);
    });

    //calculateAndDisplayRoute(directionsService, directionsDisplay);
    

}   

//Syles defines what is hidden on the map
const styles = {
    default: [],
    hide: [
        {
            featureType:"poi",
            stylers: [{ visibility: "off"}],  
        },
    ],
};

//Function called when user clicks submit
function caluclateAndDisplayRoutes(directionsService, directionsDisplay) {
    directionsService.route({
      origin: document.getElementById("from").value,
      destination: document.getElementById("to").value,
      travelMode: 'DRIVING',
      avoidHighways: true,
      waypoints: waypointarr,
      optimizeWaypoints: true,
      unitSystem: google.maps.UnitSystem.METRIC
  }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {

        const polyline = new google.maps.Polyline({
          path: response.routes[0].overview_path
      });
        
        let bounds = new google.maps.LatLngBounds();
        startLocation = new Object();
        endLocation = new Object();
  
        directionsDisplay.setDirections(response);
  
        let route = response.routes[0];
        // For each route, display summary information.
        let path = response.routes[0].overview_path;
        let legs = response.routes[0].legs;

        /*for (i=0;i<legs.length;i++) {
            var steps = legs[i].steps;
            for (j=0;j<steps.length;j++) {
              var nextSegment = steps[j].path;
              for (k=0;k<nextSegment.length;k++) {
                polyline.getPath().push(nextSegment[k]);
              }
            }
          } */
  
        let totalDistance = 0;
        for (let i = 0; i < legs.length; i++) {
            totalDistance += legs[i].distance.value;
        }
        drivingdistance=totalDistance/1000;
        for (let i = 0; i < legs.length; i++) {
        totalDuration += legs[i].duration.value;
        }
  
        for (i = 0; i < legs.length; i++) {
          if (i == 0) {
            startLocation.latlng = legs[i].start_location;
            startLocation.address = legs[i].start_address;
            // marker = google.maps.Marker({map:map,position: startLocation.latlng});
            marker = createMarker(legs[i].start_location, "start", legs[i].start_address, "green");
          }
          endLocation.latlng = legs[i].end_location;
          endLocation.address = legs[i].end_address;
          let steps = legs[i].steps;
          for (j = 0; j < steps.length; j++) {
            let nextSegment = steps[j].path;
            for (k = 0; k < nextSegment.length; k++) {
              polyline.getPath().push(nextSegment[k]);
              bounds.extend(nextSegment[k]);
            }
          }
        }
  
        polyline.setMap(map);
        for (let i = 0; i < gmarkers.length; i++) {
          gmarkers[i].setMap(null);
        }
        gmarkers = [];
        let points = polyline.GetPointsAtDistance(1000);
        for (let i = 0; i < points.length; i++) {
          let marker = new google.maps.Marker({
            map: map,
            position: points[i],
            title: i + 1 + " km"
          });
          marker.addListener('click', openInfoWindow);
        }
  
      } else {
        alert("directions response " + status);
      }
    });
  
  
    /*  function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }); */
  }

  google.maps.event.addDomListener(window, 'load', initMap);

function callback(response, status) {
    if (status == 'OK') {
      var distance = response.rows[0].elements[0].distance.text;
      console.log('Driving distance between ' + origin + ' and ' + destination + ': ' + distance);
    } else {
      console.log('Error: ' + status);
    }
  }
