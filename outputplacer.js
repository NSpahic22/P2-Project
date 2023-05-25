let submenuarr = []
let divarr = []
let submenunr = 0;




function outputplacer(outputname) {
    let parent = document.getElementById("outputsgohere")
    let childnode = document.createElement("div")
    childnode.id = "outputbelowhere"
    removeAllChildNodes(parent)
    
    parent.appendChild(childnode);

    const listItem = document.createElement('li');
    listItem.className = 'link';
  
    // Create the <div> element for the dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
  
    // Create the <i> element for the dropdown icon
    const icon = document.createElement('i');
    icon.className = 'fa fa-chevron-down';
  
    // Create the text node for the dropdown title
    const text = document.createTextNode(outputname);
  
    // Append the icon and text to the dropdown <div> element
    dropdown.appendChild(icon);
    dropdown.appendChild(text);
  
    // Create the <ul> element for the submenu items
    const submenu = document.createElement('ul');
    submenu.className = 'submenuItems';
    submenu.id ="submenus"
  
    // Call the outputappender function to get the submenu content
    const submenuContent = outputappender(outputname);
  
    // Append the submenu content to the submenu <ul> element
    submenu.appendChild(submenuContent);
  
    listItem.appendChild(dropdown);
    listItem.appendChild(submenu);
    

    divarr[submenunr] = dropdown;
    submenuarr[submenunr] = listItem

      for(let i=0; i<submenuarr.length; i++){
        parent.insertBefore(submenuarr[i],childnode);

        divarr[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var submenuItems = this.nextElementSibling;
          if (submenuItems.style.display === "block") {
            submenuItems.style.display = "none";
          } else {
            submenuItems.style.display = "block";
          }
      });
      if(i!=0){
      divarr[i-1].addEventListener("click", function() {
        this.classList.toggle("active");
        var submenuItems = this.nextElementSibling;
        if (submenuItems.style.display === "block") {
          submenuItems.style.display = "none";
        } else {
          submenuItems.style.display = "block";
        }
      }); }
    }   
    submenunr++
  }

  


function outputappender(routename){
    let outlist = document.createElement("div");
    let breaker = document.createElement("br");
    

    outlist.id = "route:" + routename
    outlist.innerhtml = "data for route: " + routename
    outlist.appendChild(breaker);  
    for(let i=0; i<outparr.length; i++){
        if(outparr[i]!=""){
        outlist.innerHTML += outputtext[i]
        outlist.appendChild(breaker);
        outlist.innerHTML += outparr[i];

        if(moreelements(i,outparr)==true){
            outlist.innerHTML += "\n"
            outlist.appendChild(breaker);
        }
      }
    }
    return outlist;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


