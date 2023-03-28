function initMap () {
    const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
    });
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: {lat:57.04, lng: 9.93},
    });
     
    directionsRenderer.setMap(map);
    document.getElementById("mode").addEventListener("click", () => {
        caluclateAndDisplayRoutes(directionsService, directionsRenderer);
    });
}

function caluclateAndDisplayRoutes(directionsService, directionsRenderer) {
    const waypts = [];
    waypts.push(document.getElementById("submitextra"+x));
    console.log(waypts);
    const selectedMode = document.getElementById("mode").value;
    directionsService
    .route({
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode[selectedMode],
        avoidHighways: true,
    })
    .then((response) => {
        directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to failed input"));
}