document.querySelector('input[name="passengersubmit"]').addEventListener("click", passengersinput);
let outputarr = [];
<<<<<<< Updated upstream
=======
let busstopradius = 0;
let n = 0;
let outparr = [];
let outputtext = []
>>>>>>> Stashed changes

function passengersinput(){
<<<<<<< Updated upstream
=======
    //a list of variable definitions for the different in- and outputs.
    let routename = document.getElementById("routename");
    
>>>>>>> Stashed changes
    let weeklyavg = document.querySelector('input[name="weeklypassengers"]').value
    let businterval = bustime(weeklyavg);
    let busstopradius = document.querySelector('input[name="busstopradius"]').value;
    let outputplace = document.getElementById("here!");
    let outlist = document.createElement("div");
    let breaker = document.createElement("br");
    let stopandtime = timecalc(totalDuration, weeklyavg, drivingdistance, busstopradius, businterval);
    let drivetime ='No route planned.'
    if(stopandtime[1]>0||stopandtime[2]>0||stopandtime[3]>0){
    drivetime = stopandtime[1] + 'h ' + stopandtime[2] + 'm ' + stopandtime[3] + 's'; }
    stops = stopandtime[0];
    businterval+=" minutes";
    removeAllChildNodes(outputplace);
    outlist.innerHTML="";

<<<<<<< Updated upstream
    let outparr = [
        drivingdistance,
=======
    //an array containing all the data that is printed for the user about the bus route
    outparr = [
        drivingdistance + "km",
>>>>>>> Stashed changes
        drivetime,
        weeklyavg,
        busstopradius,
        stops,
        businterval
    ];

<<<<<<< Updated upstream
    let outputtext = [
=======
    //the text, which describes the aforementioned data
    outputtext = [
>>>>>>> Stashed changes
        "Route length: ",
        "driving time: ",
        "Average weekly passengers: ",
        "Radius of bus stops: ",
        "Amount of bus stops on route: ",
        "Interval between buses: "
    ];
    outputarr[n+1]=outparr; outputarr[n]=outputtext

    outlist.id = "additional_outputs"
    for(let i=0; i<outparr.length; i++){
        if(outparr[i]!=""){
        outlist.innerHTML += outputtext[i]
        outlist.appendChild(breaker);
        outlist.innerHTML += outparr[i];
        outlist.appendChild(breaker);

        if(moreelements(i,outparr)==true){
            outlist.innerHTML += "\n"
            outlist.appendChild(breaker);
        }
    }
    }
    outputplace.append(outlist);
<<<<<<< Updated upstream
=======

    for (let i = 0; i*busstopradius < drivingdistance*1000; i++) {
        new google.maps.Marker({
            map: map,
            position: polyline.GetPointAtDistance(i*1000),
        });
    }
    polyline.setMap(map);
    n+=2
>>>>>>> Stashed changes
}   

function moreelements(q, arr){
    let moreelementsinlist = false;
    for(let i=q+1; i<arr.length; i++){
        if(arr[q]!=""){
        moreelementsinlist = true
        }
    }
    return moreelementsinlist;
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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
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