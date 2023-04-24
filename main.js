let busStopMarker;
let map;
let startLocation = null;
let endLocation = null;
let waypts = [];
let markersArray = [];
let distance = 1000;

const randomCords = [{ lat: 57.04, lng: 9.93 }, { lat: 58, lng: 10 }];

function GetPointAtDistance(metres) {
  if (metres === 0) return this.getPath().getAt(0);
  if (metres < 0) return null;
  if (this.getPath().getLength() < 2) return null;
  let dist=0;
  let olddist=0;
  for (let i=1; (i < this.getPath().getLength() && dist < metres); i++) {
    olddist = dist;
    dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i-1));
  }
  if (dist < metres) {
    return null;
  }
  let p1= this.getPath().getAt(i-2);
  let p2= this.getPath().getAt(i-1);
  let m = (metres-olddist)/(dist-olddist);
  return new google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m);
    //return google.maps.geometry.spherical.interpolate(p1,p2,m)
}


function createMarker(map, latlng) {
    let marker = new google.maps.Marker({
      position: latlng,
      map: map,
    });
    markersArray.push(marker)
}


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
      
      const polylineRoute = new google.maps.Polyline({
        path: response.routes[0].overview_path,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      polylineRoute.setMap(map);
    
      createMarker(map, polylineRoute.GetPointAtDistance(1000));
      
  })

  //3. Should there be a mistakes, that makes the function unable to run,
  //an alert will pop up on the website
  .catch((e) => window.alert("Directions request failed due to failed input" + status));
}


