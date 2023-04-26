let distance = 1000;

            google.maps.LatLng.prototype.distanceFrom = function(newLatLng) {
                var EarthRadiusMeters = 6378137.0;
                var lat1 = this.lat();
                var lon1 = this.lng();
                var lat2 = newLatLng.lat();
                var lon2 = newLatLng.lng();
                var dLat = (lat2-lat1) * Math.PI / 180;
                var dLon = (lon2-lon1) * Math.PI / 180;
                var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                var d = EarthRadiusMeters * c;
                return d;
            }

<<<<<<< Updated upstream
            google.maps.Polyline.prototype.GetPointAtDistance = function(metres) {// Stolen from http://www.geocodezip.com/scripts/v3_epoly.js
                if (metres == 0) return this.getPath().getAt(0);
                if (metres < 0) return null;
                if (this.getPath().getLength() < 2) return null;
                var dist=0;
                var olddist=0;
                for (var i=1; (i < this.getPath().getLength() && dist < metres); i++) {
                    olddist = dist;
                    dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i-1));
                }
                if (dist < metres) {
                    return null;
                }
                var p1= this.getPath().getAt(i-2);
                var p2= this.getPath().getAt(i-1);
                var m = (metres-olddist)/(dist-olddist);
                return new google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m);
            }

            function createMarker(map, latlng) {
                let marker = new google.maps.Marker({
                position: latlng,
                 map: map,
                });
                markersArray.push(marker)
            }
            

            const map = new google.maps.Map(document.getElementById("map"),{
                zoom: 14,
                center: { lat: 57.04, lng: 9.93 }
            });
=======
distanceFrom = function(newLatLng) {
  let EarthRadiusMeters = 6378137.0;
  let lat1 = this.lat();
  let lon1 = this.lng();
  let lat2 = newLatLng.lat();
  let lon2 = newLatLng.lng();
  let dLat = (lat2-lat1) * Math.PI / 180;
  let dLon = (lon2-lon1) * Math.PI / 180;
  let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = EarthRadiusMeters * c;
  return d;
}

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
>>>>>>> Stashed changes

            const directionsRenderer = new google.maps.DirectionsRenderer({preserveViewport: true});

            directionsRenderer.setMap(map);

            const directions = new google.maps.DirectionsService();

            directions.route({
                origin: "stolpedalsvej 61A",
                destination: "kærby",
                travelMode: "DRIVING",
                avoidHighways: true,
                waypoints: waypointarr,
                optimizeWaypoints: true,
            },(data) => {
                const polyline = new google.maps.Polyline({
                  strokeColor: "#FF0000",
                });

                var legs = data.routes[0].legs;
                for (i=0;i<legs.length;i++) {
                  var steps = legs[i].steps;
                  for (j=0;j<steps.length;j++) {
                    var nextSegment = steps[j].path;
                    for (k=0;k<nextSegment.length;k++) {
                      polyline.getPath().push(nextSegment[k]);
                    }
                  }
                } 

                polyline.setMap(map);

                
                //for (let i = 0; i*distance < /*add driving distance variable here*/; i++) {
                  createMarker(map, polyline.GetPointAtDistance(distance));
                //}
                
                map.setCenter(marker.getPosition());
                directionsRenderer.setDirections(data);
            });