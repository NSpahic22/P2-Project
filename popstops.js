


function menuappender(){
  let card = document.getElementByName("Startspot")[0].value;
  let tekstfelt = document.createElement("input");
  tekstfelt.type = "text";
  

  if (card.value == "typestart") {
    tekstfelt.id = "from";
    document.getElementById("Stopspot").appendChild(tekstfelt);
  }
  if(card.value == "typestop") {
    tekstfelt.id = "to";
    insertbefore(tekstfelt, document.getElementById(""))
  }
}
