


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

