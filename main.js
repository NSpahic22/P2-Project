let busStopMarker;
let map;
let startLocation = null;
let endLocation = null;
let waypts = null;

function createMarker(latlng, label) {
  // alert("createMarker("+latlng+","+label+","+html+","+color+")");
      let marker = new google.maps.Marker({
          position: latlng,
          // draggable: true, 
          map: map,
          title: label,
          // zIndex: Math.round(latlng.lat()*-100000)<<5
          });
          marker.myname = label;
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
    .then((response, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response);
      let route = response.routes[0];
      let distance = 1000;
      startLocation = new Object();
      endLocation = new Object();
      let polyline = new google.maps.Polyline({
        path: route,
        strokeColor: "#FF0000",
      });

      let routeLegs = response.routes[0].legs[0];
      /*
      for (i=0;i<legs.length;i++) {
        if (i == 0) { 
          startLocation.latlng = legs[i].start_location;
          startLocation.address = legs[i].start_address;
//            startLocation.marker = createMarker(legs[i].start_location,"start",legs[i].start_address,"green");
        } else { 
          waypts[i] = new Object();
          waypts[i].latlng = legs[i].start_location;
          waypts[i].address = legs[i].start_address;
//            waypts[i].marker = createMarker(legs[i].start_location,"waypoint"+i,legs[i].start_address,"yellow");
        }
        endLocation.latlng = legs[i].end_location;
        endLocation.address = legs[i].end_address;
        let steps = legs[i].steps;
// alert("processing "+steps.length+" steps");
        for (j=0;j<steps.length;j++) {
          let nextSegment = steps[j].path;
          for (k=0;k<nextSegment.length;k++) {
            polyline.getPath().push(nextSegment[k]);
            bounds.extend(nextSegment[k]);
          }
      }
    } 
    */
    createMarker(polyline.GetPointAtDistance(distance), "Bus stop");
    
   /*
    for (let i = 0; i < array.length; i++) {
      createMarker(polyline.GetPointAtDistance(i*distance),"Bus stop" + i);
      } 
      */
  } else {
    alert("directions response "+status);
    }
  });
}