document.querySelector('input[name="passengersubmit"]').addEventListener("click", passengersinput);
let outputarr = [];
let busstopradius = 0;
let n = 0;
let outparr = [];
let outputtext = []

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

    outputplacer(routename);
    for (let i = 0; i*busstopradius < drivingdistance*1000; i++) {
        new google.maps.Marker({
            map: map,
            position: polyline.GetPointAtDistance(i*1000),
        });
    }
    polyline.setMap(map);
    n+=2
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