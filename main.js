//This is function is called with our API key
function initMap () {
    //Assigning google functions
    const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
    });
    const directionsService = new google.maps.DirectionsService();

    //Creates maps
    const map = new google.maps.Map(document.getElementById("map"), {
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
    //The google function which:
    //1. Fetches the route from the user, and sets the rules for creating the route
    directionsService
    .route({
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: 'DRIVING',
        avoidHighways: true,
    })
    
    //2. Creates the route
    .then((response) => {
        directionsRenderer.setDirections(response);
    })

    //3. Should there be a mistakes, that makes the function unable to run,
    //an alert will pop up on the website
    .catch((e) => window.alert("Directions request failed due to failed input"));
}