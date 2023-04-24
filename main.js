let busStopMarker;
let map;
let startLocation = null;
let endLocation = null;
let waypts = [];
let gmarkers = [];

 /*GetPointAtDistance = function(metres) {
  if (metres == 0) return this.getPath().getAt(0);
  if (metres < 0) return null;
  if (this.getPath().getLength() < 2) return null;
  let dist=0;
  let olddist=0;
  for (var i=1; (i < this.getPath().getLength() && dist < metres); i++) {
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
} */

function createMarker(latlng, label) {
      let marker = new google.maps.Marker({
          position: latlng,
          // draggable: true, 
          map: map,
          title: label,
          zIndex: Math.round(latlng.lat()*-100000)<<5
          });
          gmarkers.push(marker);
          return marker;
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
      let route = response.routes[0];
      let distance = 1000;
      startLocation = new Object();
      endLocation = new Object();
      let polyline = new google.maps.Polyline({
        path: route.getPath(),
        strokeColor: "#FF0000",
      });

      
      let routeLegs = response.routes[0].legs[0];
      
      for (i=0;i<routeLegs.length;i++) {
        if (i == 0) { 
          startLocation.latlng = routeLegs[i].start_location;
          startLocation.address = routeLegs[i].start_address;
//            startLocation.marker = createMarker(legs[i].start_location,"start",legs[i].start_address,"green");
        } else { 
          waypts[i] = new Object();
          waypts[i].latlng = routeLegs[i].start_location;
          waypts[i].address = routeLegs[i].start_address;
//            waypts[i].marker = createMarker(legs[i].start_location,"waypoint"+i,legs[i].start_address,"yellow");
        }
        endLocation.latlng = routeLegs[i].end_location;
        endLocation.address = routeLegs[i].end_address;
        let steps = routeLegs[i].steps;
// alert("processing "+steps.length+" steps");
        for (j=0;j<steps.length;j++) {
          let nextSegment = steps[j].path;
          for (k=0;k<nextSegment.length;k++) {
            polyline.getPath().push(nextSegment[k]);
            bounds.extend(nextSegment[k]);
          }
      }
      console.log(endLocation.latlng);
    } 
    
      //createMarker(polyline.GetPointAtDistance(distance), "Bus stop");
      createMarker(map.center, "Bus stop");
  })

  //3. Should there be a mistakes, that makes the function unable to run,
  //an alert will pop up on the website
  .catch((e) => window.alert("Directions request failed due to failed input" + status));
}