const popstopElements = document.querySelectorAll('input[name="popstop"]');
let popstopcheckvalue = 0;

popstopElements.forEach(element => {
    element.addEventListener('change', Popularstoppoint);
});


// Add a change event listener to each checkbox
popstopElements.forEach(element => {
  element.addEventListener('change', () => {
    // If the current checkbox is checked, uncheck all the others
    if (element.checked) {
      popstopElements.forEach(otherElement => {
        if (otherElement !== element) {
          otherElement.checked = false;
        }
      });
    }
  });
});

function Popularstoppoint(event) {
    const checkbox = event.target;
    if (checkbox.checked) {
      console.log(checkbox.value);
      popstopcheckvalue = checkbox.value;
    }
  }