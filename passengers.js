document.querySelector('input[name="passengersubmit"]').addEventListener("click", passengersinput);
let outputarr = [];

function passengersinput(){
    let weeklyavg = document.querySelector('input[name="weeklypassengers"]').value
    let busstopradius = document.querySelector('input[name="busstopradius"]').value;

    let outputplace = document.getElementById("here!");
    let outlist = document.createElement("div");
    let breaker = document.createElement("br");
    removeAllChildNodes(outputplace);
    outlist.innerHTML="";

    let outparr = [
        weeklyavg,
        busstopradius,
    ];

    let outputtext = [
        "Average weekly passengers: ",
        "Radius of bus stops: "
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
}   

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}