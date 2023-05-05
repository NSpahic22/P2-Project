let totalDuration = 0;
let drivingdistance = 0;

//This is function is called with our API key
function initMap () {
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
    });
    const directionsService = new google.maps.DirectionsService();
    const transitLayer = new google.maps.TransitLayer();
    const trafficLayer = new google.maps.TrafficLayer();
    //Creates maps
    const map = new google.maps.Map(document.getElementById("map"), {
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

    //The button that turns the points of intrest on and off
    const pointsofintrest = document.getElementById("Pointsofintrest");
    pointsofintrest.addEventListener("click", () => {
        if (pointsofintrest.checked === true) {
            map.setOptions({
                styles:styles["default"]
            });
        }
        else {
            map.setOptions({
                styles:styles["hide"]
            }); 
        };
    });
    
    //Hides different points of intrest that just cause flodder when sites first loads
    map.setOptions({
        styles: styles["hide"]
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

    
}   

//Syles defines what is hidden on the map
const styles = {
    default: [],
    hide: [
        {
            featureType:"poi",
            stylers: [{ visibility: "off"}],  
        },
    ],
};

//Function called when user clicks submit
function caluclateAndDisplayRoutes(directionsService, directionsRenderer) {
    

    let routeStart = document.getElementById('from').value;
    let routeEnd = document.getElementById('to').value;

    let request = {
        origin: routeStart,
        destination: routeEnd,
        travelMode: 'DRIVING',
        avoidHighways: true,
        waypoints: waypointarr,
        optimizeWaypoints: true,
        unitSystem: google.maps.UnitSystem.METRIC
    }
    
    //The google function which:
    //1. Fetches the route from the user, and sets the rules for creating the route
    directionsService.route(request, function(response, status) {
        if (status === 'OK') {
            const polyline = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeWeight: 3,
            });

            let bounds = new google.maps.LatLngBounds();
            let legs = response.routes[0].legs;
            let totalDistance = 0;

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

            for (let i = 0; i < legs.length; i++) {
                totalDistance += legs[i].distance.value;
            }
            drivingdistance=totalDistance/1000;
        

            for (let i = 0; i < legs.length; i++) {
                totalDuration += legs[i].duration.value;
        
            }

            //Creates a marker for every 1000 metres traveled along the path
            for (let i = 0; i*1000 < totalDistance; i++) {
                new google.maps.Marker({
                    map: map,
                    position: polyline.GetPointAtDistance(i*1000),
                });
            }

            polyline.setMap(map);
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