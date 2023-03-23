
function appendinator(event) {
    
    const fragment = document.createDocumentFragment();
    const div = fragment
        .appendChild(document.createElement("div"))
        .appendChild(document.createElement("div"));
    div.textContent = "Input extra destination"

    document.body.appendChild(fragment);
}

function morestops(){
    const sted = document.getElementById("extrastop").value;
    
    google.maps.Marker
}