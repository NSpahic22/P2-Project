let busStopMarkers = [];
let map;
let waypointarr;


//This is function is called with our API key
function initMap () {
    //Assigning google functions
    const directionsRenderer = new google.maps.DirectionsRenderer({
        //draggable: true,
    });
    const directionsService = new google.maps.DirectionsService();
    
     //Creates maps
    map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: {lat:57.04, lng: 9.93},
    });

    //Sets map onto our site
    directionsRenderer.setMap(map);
    
    //Adds eventlistener to the submit button for the addresses
    document.getElementById("mode").addEventListener("click", () => {
        caluclateAndDisplayRoutes(directionsService, directionsRenderer);
    });
}   


//Function called when user clicks submit
function caluclateAndDisplayRoutes(directionsService, directionsRenderer) {
    // waypoint array
    const waypointarr = [];

    //The google function which:
    //1. Fetches the route from the user, and sets the rules for creating the route
    directionsService.route({
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: 'DRIVING',
        avoidHighways: true,
        waypoints: waypointarr,
        optimizeWaypoints: true,
        })
    
    
    //2. Creates the route
      .then((response) => {
        directionsRenderer.setDirections(response);
        
        let routeStart = response.routes[0].legs[0].start_location; 
        let route = response.routes[0].overview_path;
        let distanceTraveled = 1000;
        let markerPosition = google.maps.geometry.spherical.computeOffset(routeStart, distanceTraveled, google.maps.geometry.spherical.computeHeading(routeStart, route[1]));

        let busStop = new google.maps.Marker({
          position: markerPosition,
          map: map,
          title: "first bus stop"
        });

        const distanceToMarker = google.maps.geometry.spherical.computeDistanceBetween(startLocation, markerPosition);
        const closestPolylinePoint = google.maps.geometry.poly.isLocationOnEdge(markerPosition, path, 10e-2) ? markerPosition : path[google.maps.geometry.poly.computeDistanceBetween(markerPosition, path[0]) > google.maps.geometry.poly.computeDistanceBetween(markerPosition, path[path.length-1]) ? path[path.length-1] : path[0]];
        marker.setPosition(closestPolylinePoint);

    })
    
      //3. Should there be a mistakes, that makes the function unable to run,
      //an alert will pop up on the website
      if (status !== "OK") {
        (e) => window.alert("Directions request failed due to failed input" + status);
      }
    };
