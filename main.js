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
      
    const Traffic = document.getElementById("Traffic");
    Traffic.addEventListener("click", () => {
        if (Traffic.checked === true) {
            trafficLayer.setMap(map);
        }
        else {
            trafficLayer.setMap();
        }
    });

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

    const flightPlanCoordinates = [
        { lat: 37.772, lng: -122.214 },
        { lat: 21.291, lng: -157.821 },
        { lat: -18.142, lng: 178.431 },
        { lat: -27.467, lng: 153.027 },
      ];
      const flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
    
      flightPath.setMap(map);
    
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

    //Hides different points of intrest that just cause flodder
    map.setOptions({
        styles: styles["hide"]
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
    })
    
    
    //2. Creates the route
    .then((response) => {
        directionsRenderer.setDirections(response);
    })

    //3. Should there be a mistakes, that makes the function unable to run,
    //an alert will pop up on the website
    .catch((e) => window.alert("Directions request failed due to failed input" + status));
}