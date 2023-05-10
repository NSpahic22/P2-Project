document.getElementById("from").addEventListener("click",menuappender);
document.getElementById("to").addEventListener("click",menuappender);

function menuappender(){
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let tekstfelt = document.createElement("input");

  tekstfelt.type = "text";
  

  if (from === "typestart") {
    tekstfelt.placeholder = "Starting destination"
    tekstfelt.id ="newid"
    console.log(tekstfelt)
    document.getElementById("uga").appendChild(tekstfelt)
  }
  if(to === "typestop") {
    tekstfelt.id = "to";
    tekstfelt.placeholder = "Ending destination"
    to.appendChild(tekstfelt)
  }
}
