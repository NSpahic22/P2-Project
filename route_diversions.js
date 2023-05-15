//Creates event listener for when user clicks the + button
document.querySelector('input[value="+"]').addEventListener("click", appendinator);
document.querySelector('input[name="Submit"]').addEventListener("click", morestops);
//document.getElementById("mode").addEventListener("click", morestops);

//Helps create unique ids for each address
let inputcounter = 1;
let addcounter = 0;
let waypointarr = [];

/*
This function fetches the cooridantes of an address and adds a marker to that address
function createAddressMarker(address) {

    geocoder.geocode({ 'address': address }, function (results, status) {
        console.log(results);
        var latLng = {lat: results[0].geometry.location.lat (), lng: results[0].geometry.location.lng ()};
        console.log (latLng);
        if (status == 'OK') {
            let addressmarker = new google.maps.Marker({
                position: latLng,
                map: map
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
*/

//The action of the plus button
function appendinator(event) {
    //Creates new input bar and linebreak
    const inputcreater = document.createElement("input");
    const linebreaker = document.createElement("br");
    inputcreater.name = "diversion"

    //Gives input bar text and an ID
    inputcreater.placeholder = "Input extra destination" ;
    inputcreater.setAttribute("id", 'address' + inputcounter++)
 
    //Appends the input bar and linebreaker to the HTML-code
    const extraplaces = document.getElementById("extraplaces");
    extraplaces.appendChild(inputcreater);
    extraplaces.appendChild(linebreaker);
   }

function morestops(event, addressarr){
    const waypointquery = document.querySelectorAll('[name="diversion"]');
    let i = 0;
    //Emptying the array, so only the addresses that are displayed, will be made into a route
    for(let j = 0; j< waypointarr.length; j++) {
        waypointarr[j] = null;
    }
    
    //Taking the value, and making into readable locations for google api
    
    for (element of waypointquery) {
        if (element.value != null && element.value != ""){
            console.log(element.value.location);
            waypointarr.push({
                location: element.value,
                stopover: true,
            })
            //createAddressMarker(element.value);
        }
        
        i++;
    }
}