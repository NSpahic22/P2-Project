let busStopMarker;
let map;

function initMap() {
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: 57.04, lng: 9.93 },
  });
  directionsRenderer.setMap(map);
  document.getElementById("mode").addEventListener("click", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const waypoints = [];
  directionsService
    .route({
      origin: document.getElementById("from").value,
      destination: document.getElementById("to").value,
      travelMode: "DRIVING",
      avoidHighways: true,
      waypoints: waypoints,
      optimizeWaypoints: true,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
      let route = response.routes[0].overview_path;
      let routeStart = response.routes[0].legs[0].start_location;
      let distance = 1000;
      let markerPosition = google.maps.geometry.spherical.computeOffset(
        routeStart,
        distance,
        google.maps.geometry.spherical.computeHeading(routeStart, route[1])
      );
      busStopMarker = new google.maps.Marker({
        position: markerPosition,
        map: map,
        title: "Bus stop",
      });
      let polyline = new google.maps.Polyline({
        path: route,
        strokeColor: "#FF0000",
      });
      let closestPolylinePoint = google.maps.geometry.poly.isLocationOnEdge(
        busStopMarker.getPosition(),
        polyline,
        10e-2
      )
        ? busStopMarker.getPosition()
        : google.maps.geometry.spherical.interpolate(
            routeStart,
            busStopMarker.getPosition(),
            0.5
          );
      busStopMarker.setPosition(closestPolylinePoint);
    })
    .catch((e) => {
      window.alert("Directions request failed due to " + status);
    });
}