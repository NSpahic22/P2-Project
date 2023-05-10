document.getElementById("from").addEventListener("click",menuappender);
document.getElementById("to").addEventListener("click",menuappender);

function menuappender(){
  let from = document.getElementByValue("from")[0].value;
  let to = document.getElementByValue("to")[0].value;
  let tekstfelt = document.createElement("input");
  tekstfelt.type = "text";
  

  if (from.value == "typestart") {
    tekstfelt.id = "from";
    tekstfelt.placeholder = "Starting destination"
    document.getElementById("Stopspot").appendChild(tekstfelt);
  }
  if(card.value == "typestop") {
    tekstfelt.id = "to";
    tekstfelt.placeholder = "Ending destination"
    insertbefore(tekstfelt, document.getElementById("addfromabovehere"))
  }
}
