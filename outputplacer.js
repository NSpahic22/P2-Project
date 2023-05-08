let submenuarr = []
let submenunr = 0;

function outputplacer(outputname) {
    // Create the <li> element
    const listItem = document.createElement('li');
    listItem.className = 'link';
  
    // Create the <div> element for the dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown_output';
  
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
  
    submenu.addEventListener("click", function() {
        this.classList.toggle("active");
        let submenuItems = this.nextElementSibling;
        if (submenuItems.style.display === "block") {
           submenuItems.style.display = "none";
        } else {
           submenuItems.style.display = "block";
        }
     });

    
    listItem.appendChild(dropdown);
    listItem.appendChild(submenu);
    
    submenuarr[submenunr] = submenu;

    let parent = document.getElementById("outputsgohere")
    let insertbefore = document.getElementById("outputbelowhere");
    parent.insertBefore(listItem,insertbefore);
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
    console.log(outlist)
    return outlist;
}