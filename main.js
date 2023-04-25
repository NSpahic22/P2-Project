let drivingdistance=0;
let totalDuration = 0;

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
function caluclateAndDisplayRoutes(directionsService, directionsRenderer) {
    //The google function which:
    //1. Fetches the route from the user, and sets the rules for creating the route
    directionsService
    .route({
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: 'DRIVING',
        avoidHighways: true,
        waypoints: waypointarr,
        optimizeWaypoints: true,
        unitSystem: google.maps.UnitSystem.METRIC
    })
    
    //2. Creates the route and calculates driving distance
    .then((response) => {
        directionsRenderer.setDirections(response);
        const legs = response.routes[0].legs;
            let totalDistance = 0;
            for (let i = 0; i < legs.length; i++) {
                totalDistance += legs[i].distance.value;
            }
            drivingdistance=totalDistance/1000;
        

        for (let i = 0; i < legs.length; i++) {
            totalDuration += legs[i].duration.value;
        }
    })

    //3. Should there be a mistakes, that makes the function unable to run,
    //an alert will pop up on the website
    .catch((event) => window.alert("Directions request failed due to failed input"));
    
    for(let i = 0; i<waypointarr.length; i++){
        console.log()
    }
}

function callback(response, status) {
    if (status == 'OK') {
      var distance = response.rows[0].elements[0].distance.text;
      console.log('Driving distance between ' + origin + ' and ' + destination + ': ' + distance);
    } else {
      console.log('Error: ' + status);
    }
  }