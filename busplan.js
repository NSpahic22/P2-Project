document.querySelector('input[name="passengersubmit"]').addEventListener("click", passengersinput);
let outputarr = [];

function passengersinput(){
    let weeklyavg = document.querySelector('input[name="weeklypassengers"]').value
    let businterval = bustime(weeklyavg)+" minutes";
    let busstopradius = document.querySelector('input[name="busstopradius"]').value;

    let outputplace = document.getElementById("here!");
    let outlist = document.createElement("div");
    let breaker = document.createElement("br");
    removeAllChildNodes(outputplace);
    outlist.innerHTML="";

    let outparr = [
        weeklyavg,
        busstopradius,
        businterval
    ];

    let outputtext = [
        "Average weekly passengers: ",
        "Radius of bus stops: ",
        "Interval between buses: "
    ];

    outlist.id = "additional_outputs"

    for(let i=0; i<outparr.length; i++){
        if(outparr[i]!=""){
        outlist.innerHTML += outputtext[i]
        outlist.appendChild(breaker);
        outlist.innerHTML += outparr[i];
        outlist.appendChild(breaker);

        if(i<outparr.length-1 && outparr[i+1]!=""){
            outlist.innerHTML += "\n"
            outlist.appendChild(breaker);
        }
    }
    }
    outputplace.append(outlist);
    console.log(businterval);
}   

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function bustime(q){
    let interval=0;
    if(q<=1000) {
        interval = 60;
    } else if(1000<q<=5000){
        interval = 30;
    } else if(5000<q<=10000){
        interval = 15
    } else if(10000<q){
        interval = 5
    }
    return interval;
}