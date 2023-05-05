function outputplacer(outputname){
    let button = document.createElement("input");
    
    button.type = "button";
    button.id = outputname;
    button.value = outputname;

    button.addEventListener("click",output)
}
