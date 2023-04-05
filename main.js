let busStopMarkers = [];
let map;



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
        provideRouteAlternatives: false,
        avoidHighways: true,
        waypoints: waypointarr,
        optimizeWaypoints: true,
        options: {
        polylineOptions: { // specify options for the overview polyline
            strokeColor: 'black',
            strokeOpacity: 0.8,
            strokeWeight: 4,
            icons: [{
                icon: { // add arrow icons to the polyline
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 2,
                    strokeColor: 'white',
                    strokeWeight: 2,
                },
                offset: '50%', // position the arrow icons at the middle of the polyline
            }],
        },
      }})
    
    
    //2. Creates the route
      .then((response, status) => {
        directionsRenderer.setDirections(response);
        
        let route = response.routes[0];
        let polyline = route.overview_polyline; 

        if (polyline && polyline.getPath) {
        let routePath = polyline.getPath();
        let busStopInterval = 0.1; // in km
        let distanceTraveled = 0;
        let busStopNumber = 0;
    
        while (distanceTraveled < route.distance.value) {
          busStopNumber++;
          let busStopCoordinates = google.maps.geometry.spherical.interpolate(routePath.getAt(0), routePath.getAt(1), distanceTraveled / route.distance.value);
          let busStopMarker = new google.maps.Marker({
            position: busStopCoordinates,
            map: map,
            title: "Bus Stop " + busStopNumber,
          });
    
          busStopMarkers.push(busStopMarker);
          distanceTraveled += busStopInterval * 1000;
        }
    
      } else {
        console.error("Polyline or getPath method is not available.");
      }} )
    
      //3. Should there be a mistakes, that makes the function unable to run,
      //an alert will pop up on the website
      if (status !== "OK") {
        (e) => window.alert("Directions request failed due to failed input" + status);
      }
    };
