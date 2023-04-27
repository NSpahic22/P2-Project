


function createMarker(latlng, label, html, color) {
  // alert("createMarker("+latlng+","+label+","+html+","+color+")");
  let contentString = '<b>' + label + '</b><br>' + html;
  let marker = new google.maps.Marker({
    position: latlng,
    // draggable: true, 
    map: map,
    icon: getMarkerImage(color),
    title: label,
    zIndex: Math.round(latlng.lat() * -100000) << 5
  });
  marker.myname = label;
  gmarkers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
  return marker;
}

function getMarkerImage(iconColor) {
  if ((typeof(iconColor) == "undefined") || (iconColor == null)) {
    iconColor = "red";
  }
  if (!markerIcons[iconColor]) {
    markerIcons[iconColor] = {
      url: "http://maps.google.com/mapfiles/ms/micons/" + iconColor + ".png"
    };
  }
  return markerIcons[iconColor];

}

function openInfoWindow() {
  let contentString = this.getTitle() + "<br>" + this.getPosition().toUrlValue(6);
  infowindow.setContent(contentString);
  infowindow.open(map, this);
}

// === A method which returns an array of GLatLngs of points a given interval along the path ===
google.maps.Polyline.prototype.GetPointsAtDistance = function(metres) {
  let next = metres;
  let points = [];
  // some awkward special cases
  if (metres <= 0) return points;
  let dist = 0;
  let olddist = 0;
  for (let i = 1;
    (i < this.getPath().getLength()); i++) {
    olddist = dist;
    dist += google.maps.geometry.spherical.computeDistanceBetween(this.getPath().getAt(i), this.getPath().getAt(i - 1));
    while (dist > next) {
      let p1 = this.getPath().getAt(i - 1);
      let p2 = this.getPath().getAt(i);
      let m = (next - olddist) / (dist - olddist);
      points.push(new google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m));
      next += metres;
    }
  }
  return points;
}