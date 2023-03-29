//Creates event listener for when user clicks the + button
document.querySelector('input[value="+"]').addEventListener("click", appendinator);
document.querySelector('input[name="Submit"]').addEventListener("click", morestops);

//Helps create unique ids for each address
let inputcounter = 1;
let addcounter = 0;

//The action of the plus button
function appendinator(event) {
    //Creates new input bar and linebreak
    const inputcreater = document.createElement("input");
    const linebreaker = document.createElement("br");
    inputcreater.name = "diversion"

    //Gives input bar text and an ID
    inputcreater.placeholder = "Input extra destination";
    inputcreater.setAttribute("id", 'address' + inputcounter++)
 
    //Appends the input bar and linebreaker to the HTML-code
    const extraplaces = document.getElementById("extraplaces");
    extraplaces.appendChild(inputcreater);
    extraplaces.appendChild(linebreaker);
   }

function morestops(event, addressarr){
    const waypointquery = document.querySelectorAll('[name="diversion"]');
    let i = 0;
    let waypointarr = [];

    for (element of waypointquery) {
        if (element.value != null){
            waypointarr[i]=element.value;
        }
        i++
    }
    console.log(waypointarr);
}