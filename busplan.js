document.querySelector('input[name="passengersubmit"]').addEventListener("click", passengersinput);
//document.querySelector('input[name="timebetweenstops"]').addEventListener("click", timeBetweenStops);

let outputarr = [];
let busstopradius = 0;
let marker = [];
let busstops = [];
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
let busstopcheck;
let n = 0;
let outparr = [];
let outputtext = [];
let removedStops = [];
let removedIndex = 0;

//The main function where the data about the bus plan is calculated and printed based on user inputs
function passengersinput(){
    //a list of variable definitions for the different in- and outputs.
    let routename = document.getElementById("routename").value;
    let weeklyavg = document.querySelector('input[name="weeklypassengers"]').value
    let businterval = bustime(weeklyavg);
    let busstopradius = document.querySelector('input[name="busstopradius"]').value;
    let stopandtime = timecalc(totalDuration, weeklyavg, drivingdistance, busstopradius, businterval);
    let drivetime ='No route planned.'
    if(stopandtime[1]>0||stopandtime[2]>0||stopandtime[3]>0){
    drivetime = stopandtime[1] + 'h ' + stopandtime[2] + 'm ' + stopandtime[3] + 's'; }
    stops = stopandtime[0];
    let effeciency = effcalc(totalDuration, weeklyavg, drivingdistance, stops, businterval);
    businterval+=" minutes";

    //an array containing all the data that is printed for the user about the bus route
    outparr = [
        drivingdistance + "km",
        drivetime,
        weeklyavg,
        busstopradius,
        stops,
        businterval,
        effeciency
    ];

    //the text, which describes the aforementioned data
    outputtext = [
        "Route length: ",
        "driving time: ",
        "Average weekly passengers: ",
        "Radius of bus stops: ",
        "Amount of bus stops on route: ",
        "Interval between buses: ",
        "Effeciency score: "
    ];

    for (let i = 1; i*busstopradius < totalDistance; i++) {
        marker[i-1] = new google.maps.Marker({
            map: map,
            position: polyline.GetPointAtDistance(i*busstopradius),
            draggable: true,
        });
        marker[i-1].setMap(map);
        
    }

        for (let i = 0; i < marker.length; i++) {
            marker[i].addListener('click', () => {
                marker[i].setMap(null);
                removedStops[removedIndex] = i;
                removedIndex++;
            });
            
        }
    
    

    console.log(marker.length + "okyayy");

    for (let i = 0; i < marker.length; i++) {
        marker[i].addListener("dragend", () => {
            let markerPosition = marker[i].getPosition();
            let shortestDist = google.maps.geometry.spherical.computeDistanceBetween(markerPosition, polypath[0]);
            for (let j = 1; j < polypath.length; j++) {
                if (google.maps.geometry.spherical.computeDistanceBetween(markerPosition, polypath[j]) < shortestDist) {
                    shortestDist = google.maps.geometry.spherical.computeDistanceBetween(markerPosition, polypath[j]);
                    marker[i].setPosition(polypath[j]);
                }
                
            }
            
        });
    }
    
    //marker.push(marker[i]);
    busstopcheck = 1;
    polyline.setMap(map);
    n+=2
}   

function busstopWaypoints(){
    
if (removedStops != 0) {
    removedStops.sort(function(a, b) {
        return a - b;
      });
    }
    
    for (let i = removedStops.length-1; i > -1; i--) {
        marker.splice(removedStops[i],1);
    }
    removedStops = [];
    removedIndex = 0;
   
    morestops();
    for (let i = 0; i < marker.length; i++) {
        waypointarr.push({
            location: marker[i].getPosition(),
            stopover: true,
        })
    }
    for (let i = 0; i < marker.length; i++) {
        marker[i].setMap(null);
        }
        marker = [];
}



function createBusstops(legs){
    if(busstopcheck === 1) {
        busstops[0] = new google.maps.Marker({
            map: map,
            position: legs[0].start_location,
            draggable: false,
            label: labels[labelIndex++ % labels.length],
            title: "Stop number 1",
        });
        addInfoWindow(busstops[0], "First bus stop")
        for (let i = 0; i < legs.length; i++) {
            busstops[i+1] = new google.maps.Marker({
                map: map,
                position: legs[i].end_location,
                draggable: false,
                label: labels[labelIndex++ % labels.length],
            });
            addInfoWindow(busstops[i+1], "Distance from last bus stop: " + legs[i].distance.value + " meters \n| " + 
            "It will take the bus " + Math.round((legs[i].duration.value/60 + Number.EPSILON) * 100) / 100 + " minutes to reach this stop from the last stop");
            }
        }
        labelIndex = 0;
        
    }

    function addInfoWindow(marker, message) {
        let infoWindow = new google.maps.InfoWindow({
            content: message
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
        });

        google.maps.event.addListener(map, 'click', function () {
            infoWindow.close(map, marker);
        });
    }


//a function used in the loop. This function checks if there are more elements that are non empty in the array
function moreelements(q, arr){
    let moreelementsinlist = false;
    for(let i=q+1; i<arr.length; i++){
        if(arr[q]!=""){
        moreelementsinlist = true
        }
    }
    return moreelementsinlist;
}

function effcalc(totaltime, users, length, stopint, busamount) {
    if(stopint>length) {stopint=1};
    return Math.floor(((totaltime/users)+((totaltime/busamount)/stopint+((users/stopint)*(busamount/users)))*length)*200/users)
}

function timecalc(totaltime, users, length, stopint, busamount){
    length=length*1000

    let stops = (length-(length % stopint))/stopint;
    let peopleprstopprprminprbus = ((users-users%7)/7)/(24*60)*busamount;
    let additionalminutes = 0
    for(i=0;i<=peopleprstopprprminprbus;i+=5){
        additionalminutes+=60;
    }
    console.log(totaltime);
    if(totaltime>0){
    totaltime+=additionalminutes; }
    console.log(totaltime);
    

    const hours = Math.floor(totaltime / 3600);
    const minutes = Math.floor((totaltime - (hours * 3600)) / 60);
    const seconds = Math.floor(totaltime - (hours * 3600) - (minutes * 60));
   
    let returnarr = [stops, hours, minutes, seconds];
    return returnarr;
}



function bustime(q){
    let interval=0;
    if(q<0){
        interval = 'error'
    } if(q>0 && q<=1000) {
        interval = 60;
    } if(q>1000 && q<=5000){
        interval = 30;
    } if(q>5000 && q<=10000){
        interval = 15
    } if(q>10000){
        interval = 5
    }
    return interval;
}