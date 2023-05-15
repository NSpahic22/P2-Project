//These to variables are used to calculate effeciency
let totalDuration = 0;
let drivingdistance = 0;
let map;
let directionsRenderer;
let directionsService;
let polyline;
let totalDistance;
let polypath;
let legs;
let geocoder;
const polyColor = ["blue", "red", "green", "yellow", "black", "purple", "pink", "orange"];
let polyIndex = 0;

//This function is called with our API key
function initMap () {
    
    geocoder = new google.maps.Geocoder();
    
    //This function is used to calculate a distance between 2 coordinates. It returns the result in meters
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

    //This function finds the coordinates of a point located on specific distance on a path. It returns the lat and lng of the specific point.
    google.maps.Polyline.prototype.GetPointAtDistance = function(metres) {
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

    //Assigning google functions
    const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: false,
        suppressMarkers: true,
    });
    const directionsService = new google.maps.DirectionsService();
    const transitLayer = new google.maps.TransitLayer();
    const trafficLayer = new google.maps.TrafficLayer();

    //Creates the map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: {lat:57.04, lng: 9.93},
    });

    //The button that turns traffic on and off  
    const Traffic = document.getElementById("Traffic");
    Traffic.addEventListener("click", () => {
        if (Traffic.checked === true) {
            trafficLayer.setMap(map);
        }
        else {
            trafficLayer.setMap();
        }
    });

    const pointsofintrest = document.getElementById("Pointsofintrest");
    const busstops = document.getElementById("busstops");
    //Turns current busstops on and off
    busstops.addEventListener("click", () => { 
        visualcontroller(pointsofintrest, busstops, map);
    });

    //The button that turns the points of intrest on and off
    pointsofintrest.addEventListener("click", () => { 
        visualcontroller(pointsofintrest, busstops, map);
    });
    
    //Hides different points of interest that just cause flodder when sites first loads
    map.setOptions({
        styles: styles["mapload"]
    });

    //Sets map onto our site 
    directionsRenderer.setMap(map);
    transitLayer.setMap(map); 
    
    //Adds eventlistener to the submit button for the addresses
    document.getElementById("mode").addEventListener("click", () => {
        caluclateAndDisplayRoutes(directionsService, directionsRenderer);
    });
    document.getElementById("morestopbutton").addEventListener("click", () => {
        caluclateAndDisplayRoutes(directionsService, directionsRenderer);
    });
    var geocoder = new google.maps.Geocoder();
     // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    //Lets us tranform lat and lng to an address
    geocoder.geocode({location: mapsMouseEvent.latLng}, function(results, status) {
        if(status === 'OK') {
            if(results[0]) {
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                  });
                  let myString = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
                  myString = myString.replace(/[^0-9., ]/g, '');;
                  myString += "<br>";
                  myString += results[0].formatted_address
                  infoWindow.setContent(
                    myString, 
                  );
                  infoWindow.open(map);
            }
        }
    }
        );
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    
  });
    document.getElementById("timebetween").addEventListener("click", () => {
        busstopWaypoints();
        caluclateAndDisplayRoutes(directionsService, directionsRenderer);
    });

    //Sets map onto our site 
    directionsRenderer.setMap(map);
}   

//Styles defines what is hidden on the map
const styles = {
    mapload: [
        {
            featureType:"transit.station.bus",
            stylers:[{visibility:"off"}],
        },
        {
            featureType:"poi",
            stylers:[{visibility:"off"}],
        }
    ],
    poitrue: [
        {
        featureType: "transit.station.bus",
        stylers: [{visibility: "off"}],
        },
        {
            featureType:"poi",
            stylers:[{visibility:"on"}],
        },
    ],
    poiandbusstopstrue: [
        {
        featureType: "transit.station.bus",
        stylers: [{visibility: "on"}],
        },
        {
            featureType:"poi",
            stylers:[{visibility:"on"}],
        },
    ],
    poifalse: [
        {
            featureType:"poi",
            stylers:[{visibility:"off"}],
        },
        {
            featureType: "transit.station.bus",
            stylers: [{visibility: "on"}],
        },
    ],   
};

function visualcontroller(pointsofintrest, busstops, map) {
    if (pointsofintrest.checked === true && busstops.checked === true) {
        map.setOptions({
            styles: styles["poiandbusstopstrue"]
        });
    }
    else if(pointsofintrest.checked === true && busstops.checked === false) {
        map.setOptions({
            styles:styles["poitrue"]
        }); 
    }
    else if(pointsofintrest.checked === false && busstops.checked === true) {
        map.setOptions({
            styles: styles["poifalse"]
        });
    }
    else if(pointsofintrest.checked === false && busstops.checked === false) {
        map.setOptions({
            styles: styles["mapload"]
        });
    }
    else if(pointsofintrest === false){
    }
};

//Function called when user clicks submit
function caluclateAndDisplayRoutes(directionsService, directionsRenderer) {
    let routeStart
    let routeEnd
    //Collects the start and end of the route via user input
    routeStart = document.getElementById('from').value;
    if(routeStart === "typestart"){
        routeStart = document.getElementById("startpoint").value;
    }

    routeEnd = document.getElementById('to').value;
    if(routeEnd === "typestop"){
        routeEnd = document.getElementById("endpoint").value
    }

    //Requirements for the newly created route
    let request = {
        origin: routeStart,
        destination: routeEnd,
        travelMode: 'DRIVING',
        avoidHighways: true,
        waypoints: waypointarr,
        optimizeWaypoints: true,
        unitSystem: google.maps.UnitSystem.METRIC
    }
    
    //Google function that fetches directions for the requested route
    directionsService.route(request, function(response, status) {
        //If the request is valid, the website will proceed with creating the route 
        if (status === 'OK') {

            //Specifications for a polyline that displays the newly created route
            polyline = new google.maps.Polyline({
                path: [],
                strokeColor: polyColor[polyIndex++ % polyColor.length],
                strokeWeight: 3,
            });
            if (polyIndex === 7) {
                polyIndex = 0;
            }

            //Lat/lng limit used to keep an object within a specific location
            let bounds = new google.maps.LatLngBounds();

            //Finds the legs of the newly created route
            legs = response.routes[0].legs;
            createBusstops(legs);
            waypointarr = [];
            busstopcheck = 0;
            

            //Total distance of the newly created route in meters
            totalDistance = 0;

            //Creates a precise path for the polyline, as overview_path is inaccurate at larger distances
            for (i = 0; i < legs.length; i++) {
                let steps = legs[i].steps;
                for (j = 0; j < steps.length; j++) {
                    let nextSegment = steps[j].path;
                    for (k = 0; k < nextSegment.length; k++) {
                        polyline.getPath().push(nextSegment[k]);
                        bounds.extend(nextSegment[k]);
                    }
                }
            }
            polypath = polyline.getPath().getArray();

            //Calculates the distance of the route
            for (let i = 0; i < legs.length; i++) {
                totalDistance += legs[i].distance.value;
            }
            drivingdistance=totalDistance/1000;
        
            //Calculates the duration of the route
            for (let i = 0; i < legs.length; i++) {
                totalDuration += legs[i].duration.value;
        
            }
            
            directionsRenderer.setDirections(response);
            
        }
        else 
        {   
            // Should there be a mistake, an alert will pop up on the website describing what is wrong
            window.alert('Directions request failed due to ' + status);
        }
        for(let i = 0; i<waypointarr.length; i++){
            console.log()
        }
    });
    
}



function callback(response, status) {
    if (status == 'OK') {
      var distance = response.rows[0].elements[0].distance.text;
      console.log('Driving distance between ' + origin + ' and ' + destination + ': ' + distance);
    } else {
      console.log('Error: ' + status);
    }
  }

// Basically så giver den alle link en active toggle når man trykker på den 
let ListElements = document.querySelectorAll('link');

ListElements.forEach(listElement =>{
    listElement.addEventListener('click', () => {
        if (listElement.classisList.contains('active')){
            listElement.classicList.remove('active');
        }else{
            listElement.forEach(ListE => {
                ListE.classList.remove('active');
            })
            listElement.classList.toggle('active');
        }
    })
});
// Det her var fikset til hvorfor den ikke gad at virke før, uden den her vil den ikke dropdown. Har ikke helt styr på hvordan den virker.
// Get all dropdown buttons
   var dropdowns = document.getElementsByClassName("dropdown");

   // Add a click event listener to each dropdown button
   for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener("click", function() {
         this.classList.toggle("active");
         var submenuItems = this.nextElementSibling;
         if (submenuItems.style.display === "block") {
            submenuItems.style.display = "none";
         } else {
            submenuItems.style.display = "block";
         }
      });
   }

   $( function() {
    $( "#draggable" ).draggable();
  } );