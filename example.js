<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<title>Google Maps JavaScript API v3 Example: Directions Waypoints (LatLng)</title>
<style type="text/css">
html { height: 100% }
body { height: 100%; margin: 0px; padding: 0px }
</style>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyCxitB5jQcw7weQdg9MqBRfxr6mj81wT7I"></script>
<script type="text/javascript" src="scripts/v3_epoly.js"></script>
<script type="text/javascript">
  var directionDisplay;
  var directionsService = new google.maps.DirectionsService();
      var gmarkers = [];
      var map = null;
      var startLocation = null;
      var endLocation = null;
      var waypts = null;
var icons = new Array();
icons["red"] = new google.maps.MarkerImage("mapIcons/marker_red.png",
      // This marker is 20 pixels wide by 34 pixels tall.
      new google.maps.Size(20, 34),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is at 9,34.
      new google.maps.Point(9, 34));
function getMarkerImage(iconColor) {
   if ((typeof(iconColor)=="undefined") || (iconColor==null)) { 
      iconColor = "red"; 
   }
   if (!icons[iconColor]) {
      icons[iconColor] = new google.maps.MarkerImage("mapIcons/marker_"+ iconColor +".png",
      // This marker is 20 pixels wide by 34 pixels tall.
      new google.maps.Size(20, 34),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is at 6,20.
      new google.maps.Point(9, 34));
   } 
   return icons[iconColor];

}
  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.
 
  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.

  var iconImage = new google.maps.MarkerImage('mapIcons/marker_red.png',
      // This marker is 20 pixels wide by 34 pixels tall.
      new google.maps.Size(20, 34),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is at 9,34.
      new google.maps.Point(9, 34));
  var iconShadow = new google.maps.MarkerImage('http://www.google.com/mapfiles/shadow50.png',
      // The shadow image is larger in the horizontal dimension
      // while the position and offset are the same as for the main image.
      new google.maps.Size(37, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(9, 34));
      // Shapes define the clickable region of the icon.
      // The type defines an HTML &lt;area&gt; element 'poly' which
      // traces out a polygon as a series of X,Y points. The final
      // coordinate closes the poly by connecting to the first
      // coordinate.
  var iconShape = {
      coord: [9,0,6,1,4,2,2,4,0,8,0,12,1,14,2,16,5,19,7,23,8,26,9,30,9,34,11,34,11,30,12,26,13,24,14,21,16,18,18,16,20,12,20,8,18,4,16,2,15,1,13,0],
      type: 'poly'
  };
var infowindow = new google.maps.InfoWindow(
  { 
    size: new google.maps.Size(150,50)
  });
    
function createMarker(latlng, label, html, color) {
// alert("createMarker("+latlng+","+label+","+html+","+color+")");
    var contentString = '<b>'+label+'</b><br>'+html;
    var marker = new google.maps.Marker({
        position: latlng,
        // draggable: true, 
        map: map,
        shadow: iconShadow,
        icon: getMarkerImage(color),
        shape: iconShape,
        title: label,
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        marker.myname = label;
        gmarkers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
        });
        return marker;
}

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var myOptions = {
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: chicago
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);
    calcRoute();
  }
  
  function calcRoute() {
/*
http://maps.google.com/maps?f=d&source=s_d&
saddr=Strada+Remus+Opreanu&
daddr=44.66585,28.03349+
to:44.56563,27.32238+
to:44.5779449,27.117297+
to:44.62509,26.95591+
to:Pia%C5%A3a+Constitu%C5%A3iei
&hl=en&geocode=FdcFogIdOWC1AQ%3BFfqLqQId0sGrASmXoWjF0I-wQDE32myOBOYYoQ%3BFX4EqAIdDOigASlvHIQpJVKwQDFGsmnioK01vw%3BFZg0qAId8cadASn9sLXiELKxQDEFvVn1gXkcXQ%3BFcLsqAIdhlCbASk_5J-Q1rqxQDFnNqGrp-s7CQ%3BFUjspQIdZh6OAQ&mra=dpe&mrcr=0&mrsp=4&sz=11&via=1,2,3,4&sll=44.581665,27.011948&sspn=0.211276,0.441513&ie=UTF8&ll=44.510218,26.1866&spn=0.211535,0.441513&t=h&z=11
*/


    var request = {
        origin: "Strada Remus Opreanu",
        destination: "Piata Constitutiei",
        waypoints: [{location:new google.maps.LatLng(44.66585,28.03349),stopover:false},
                    {location:new google.maps.LatLng(44.56563,27.32238),stopover:false},
                    {location:new google.maps.LatLng(44.5779449,27.117297),stopover:false},
                    {location:new google.maps.LatLng(44.62509,26.95591),stopover:false}],
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById("directions_panel");
        directionsDisplay.setPanel(summaryPanel);
        var bounds = new google.maps.LatLngBounds();
        var route = response.routes[0];
        var summaryPanel = document.getElementById("directions_panel");
        var detailsPanel = document.getElementById("direction_details");
        startLocation = new Object();
        endLocation = new Object();
        var polyline = new google.maps.Polyline({
		path: [],
		strokeColor: '#FF0000',
		strokeWeight: 3
	});


	var legs = response.routes[0].legs;
// alert("processing "+legs.length+" legs");
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
          var steps = legs[i].steps;
// alert("processing "+steps.length+" steps");
          for (j=0;j<steps.length;j++) {
            var nextSegment = steps[j].path;
            for (k=0;k<nextSegment.length;k++) {
              polyline.getPath().push(nextSegment[k]);
              bounds.extend(nextSegment[k]);



            }
          }
        }
        createMarker(polyline.GetPointAtDistance(9500),"9.5km","9.5km");
        createMarker(polyline.GetPointAtDistance(64800),"64.8km","64.8km");
      } else {
        alert("directions response "+status);
      }
    });
  }
</script>
</head>
<body onload="initialize()">
<div id="map_canvas" style="float:left;width:70%;height:100%;"></div>
<div id="control_panel" style="float:right;width:30%;text-align:left;padding-top:20px">
<div id="directions_panel" style="margin:20px;background-color:#FFEE77;"></div>
</div>
<script src="http://www.google-analytics.com/urchin.js" type="text/javascript"> 
</script> 
<script type="text/javascript"> 
_uacct = "UA-162157-1";
urchinTracker();
</script> 
</body>
</html>
