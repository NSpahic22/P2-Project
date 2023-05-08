//Adds an event listener to the "submit" button.
document.querySelector('input[name="passengersubmit"]').addEventListener("click", passengersinput);
let outputarr = [];
let busstopradius = 0;
let marker = [];

//The main function where the data about the bus plan is calculated and printed based on user inputs
function passengersinput(){
    //a list of variable definitions for the different in- and outputs.
    let weeklyavg = document.querySelector('input[name="weeklypassengers"]').value
    let businterval = bustime(weeklyavg, drivingdistance);
    busstopradius = document.querySelector('input[name="busstopradius"]').value;
    let outputplace = document.getElementById("here!");
    let outlist = document.createElement("div");
    let breaker = document.createElement("br");
    let stopandtime = timecalc(totalDuration, weeklyavg, drivingdistance, busstopradius, businterval);
    let effeciency = "No route planned"
    if(effcalc(totalDuration, weeklyavg, drivingdistance, stopandtime[0], businterval)!=NaN){
        effeciency = effcalc(totalDuration, weeklyavg, drivingdistance, stopandtime[0], businterval)+" enh"
    }
    let drivetime ='No route planned.'
    if(stopandtime[1]>0||stopandtime[2]>0||stopandtime[3]>0){
    drivetime = stopandtime[1] + 'h ' + stopandtime[2] + 'm ' + stopandtime[3] + 's'; }
    stops = stopandtime[0];
    if(drivingdistance!=0){
    businterval+=" minutes"; }

    //every time the code is run, the old data are removed before the new are added
    removeAllChildNodes(outputplace);
    outlist.innerHTML="";

    //an array containing all the data that is printed for the user about the bus route
    let outparr = [
        drivingdistance + "km",
        drivetime,
        weeklyavg,
        busstopradius,
        stops,
        businterval,
        effeciency  
    ];

    //the text, which describes the aforementioned data
    let outputtext = [
        "Route length: ",
        "Driving time: ",
        "Average weekly passengers: ",
        "Radius of bus stops: ",
        "Amount of bus stops: ",
        "Interval between buses: ",
        "Effeciency score: "
    ];

    //This loop prints the data and the text, and adds line spaces for the readability of the data
    outlist.id = "additional_outputs"
    for(let i=0; i<outparr.length; i++){
        if(outparr[i]!=""){
        outlist.innerHTML += outputtext[i]
        outlist.appendChild(breaker);
        outlist.innerHTML += outparr[i];

        if(moreelements(i,outparr)==true){
            outlist.innerHTML += "\n"
            outlist.appendChild(breaker);
        }
    }
    }
    outputplace.append(outlist);

    for (let i = 1; i*busstopradius < drivingdistance*1000; i++) {
        marker[i-1] = new google.maps.Marker({
            map: map,
            position: polyline.GetPointAtDistance(i*1000),
            draggable: true,
        });
    }

    for (let i = 0; i < marker.length; i++) {
        marker[i].addListener("dragend", () => {
            let markerPosition = marker[i].getPosition();
            console.log(markerPosition);
            let closestPoint = 0;
            let shortestDist = google.maps.geometry.spherical.computeDistanceBetween(markerPosition, polypath[0]);
            console.log(shortestDist);
            for (let j = 1; j < polypath.length; j++) {
                if (google.maps.geometry.spherical.computeDistanceBetween(markerPosition, polypath[j]) < shortestDist) {
                    shortestDist = google.maps.geometry.spherical.computeDistanceBetween(markerPosition, polypath[j]);
                }
                
            }
            closestPoint = j;
            marker[i].setPosition(polypath[j])
        });
    }
    
    //marker.push(marker[i]);

    polyline.setMap(map);
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

//The calculator of the effeciency score of the bus route
function effcalc(totaltime, users, length, stopint, busamount) {
    if(stopint>length) {stopint=1};
    return Math.floor(((totaltime/users)+((totaltime/busamount)/stopint+((users/stopint)*(busamount/users)))*length)*200/users)
}

//the calculator of the amount of stops needed on the route and the time it takes to drive the route in seconds, hours and minutes
function timecalc(totaltime, users, length, stopint, busamount){
    length=length*1000

    let stops = ((length-(length % stopint))/stopint)/2;
    let peopleprstopprprminprbus = ((users-users%7)/7)/(24*60)*busamount;
    let additionalminutes = 0
    for(i=0;i<=peopleprstopprprminprbus;i+=5){
        additionalminutes+=60;
    }
    
    if(totaltime>0){
    totaltime+=additionalminutes; }
    
    //The time is put into hours, minutes and seconds.
    const hours = Math.floor(totaltime / 3600);
    const minutes = Math.floor((totaltime - (hours * 3600)) / 60);
    const seconds = Math.floor(totaltime - (hours * 3600) - (minutes * 60));
   
    let returnarr = [stops, hours, minutes, seconds];
    return returnarr;
}

//removes all childen from a node, needed in the main function of the busplan.
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


//bases the time interval between buses on amount of average weekly users
function bustime(q, n){
    let interval=0;
    if(n === 0){
        interval = "no route planned";
        return interval;
    }
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