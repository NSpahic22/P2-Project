document.getElementById("from").addEventListener("click",menuappender);
document.getElementById("to").addEventListener("click",menuappender);

function menuappender(){
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let tekstfelta = document.createElement("input");
  let tekstfeltb = document.createElement("input");
  
  if(from !="typestart" || tekstfelta.value!=""){
  removeAllChildNodes(document.getElementById("appendfromhere")) }

  if(to !="typestop" || tekstfeltb.value!=""){
  removeAllChildNodes(document.getElementById("appendtohere")) }


  
  if(document.getElementById("appendfromhere").children.length<1){
    if (from === "typestart") {
      tekstfelta.placeholder = "Starting destination"
      tekstfelta.id ="startpoint"
      document.getElementById("appendfromhere").appendChild(tekstfelta)
    }
  }

  if(document.getElementById("appendtohere").children.length<1){
    if(to === "typestop") {
      tekstfeltb.placeholder = "Ending destination"
      tekstfeltb.id = "endpoint";
      document.getElementById("appendtohere").appendChild(tekstfeltb)
    }
  }
  console.log(tekstfelta.value)
}


function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}