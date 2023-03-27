document.getElementById("addmore").addEventListener("click", appendinator);
x=1;

function appendinator(event) {
    
    const fragment = document.createDocumentFragment();
    const div = fragment
        .appendChild(document.createElement("div"))
        .appendChild(document.createElement("input"));
    div.placeholder = "Input extra destination"
    div.id = "submitextra"+x;
    console.log(event.value)

    const extraplaces = document.getElementById("extraplaces");
    

   extraplaces.insertBefore(fragment,document.getElementById("submitextra"));
   x++
}

function morestops(){
    const sted = document.getElementById("extrastop").value;
    
    google.maps.Marker
}