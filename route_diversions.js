document.querySelector('input[value="+"]').addEventListener("click", appendinator);

const test = document.querySelector('input[value="+"]');
console.log(test);

function appendinator(event) {
    const inputcreater = document.createElement("input");
    const linebreaker = document.createElement("br");
    inputcreater.placeholder = "Input extra destination";

    const extraplaces = document.getElementById("extraplaces");
    extraplaces.appendChild(inputcreater);
    extraplaces.appendChild(linebreaker);
   }

function morestops(){
    const sted = document.getElementById("extrastop").value;
    
    google.maps.Marker
}