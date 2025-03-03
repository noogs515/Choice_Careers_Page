let currentStep = 1
const steps = document.querySelectorAll(".form-step");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const yearSelect = document.getElementById("year");
const currentYear = new Date().getFullYear();
const startYear = 1950;




/////////////////////////////Hamburger//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const menu = document.querySelector(".menu");

    // Toggle menu visibility when the hamburger menu is clicked
    hamburgerMenu.addEventListener("click", () => {
        menu.classList.toggle("show");
    });

    // Close the menu when clicking outside of it (optional)
    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            menu.classList.remove("show");
        }
    });
});


/////////////////////////////Disable Previous Button////////////////////////
////////////////////////////////////////////////////////////////////////////

function updateNavigation() {
    if (currentStep === 1 || currentStep === 27) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "inline-block";
    }
}

updateNavigation();

//////////////////////////Show Step Function////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function showStep(stepNumber){
    steps.forEach((step,index)=>{
        step.classList.toggle("active", index + 1 === stepNumber);
    });

    const activeStep = document.querySelector(".form-step.active");
    const addButton = document.getElementById("add-employment");
    const removeButton = document.getElementById("remove-employment");

    if (stepNumber === 20) {
        if (activeStep) {
            activeStep.appendChild(addButton);
            activeStep.appendChild(removeButton);
        }
        addButton.style.display = "inline-block";
        removeButton.style.display = "inline-block";
    } else {
        addButton.style.display = "none";
        removeButton.style.display = "none";
    }

    if (stepNumber === 27) {
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        document.getElementById('submit').style.display = "inline-block";
    }

    nextButton.disabled = !checkInputs(stepNumber);
    prevButton.disabled = (stepNumber === 1 || stepNumber === 27);

};

/////////////////////////////Check Inputs///////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function checkInputs(stepNumber) {
    const currentStepElement = document.getElementById(`step${stepNumber}`);
    if (!currentStepElement) return false;

    const currentStepInputs = currentStepElement.querySelectorAll(".input-box");
    
    if (currentStepInputs.length === 0) {
        return true;
    }

    let radioChecked = false;
    let checkboxChecked = false;
    let allTextInputsFilled = true;

    for (let input of currentStepInputs) {
        if (input.type === "radio") {
            if (input.checked) {
                radioChecked = true;
            }
        } else if (input.type === "checkbox") {
            if (input.checked) {
                checkboxChecked = true;
            }
        } else if (input.type === "text" || input.type === "textarea") {
            if (input.value.trim() === "") {
                allTextInputsFilled = false;
            }
        }
    }

    if (currentStepElement.querySelectorAll("input[type='radio']").length > 0 && !radioChecked) {
        return false;
    }

    if (currentStepElement.querySelectorAll("input[type='checkbox']").length > 0 && !checkboxChecked) {
        return false;
    }

    if (currentStepElement.querySelectorAll("input[type='text'], textarea").length > 0 && !allTextInputsFilled) {
        return false;
    }

    return true;
}


/*function checkInputs(stepNumber) {
    const currentStepElement = document.getElementById(`step${stepNumber}`);
    if (!currentStepElement) return false;

    const currentStepInputs = currentStepElement.querySelectorAll(".input-box");
    return [...currentStepInputs].every(input => {
        if (input.type === "radio" || input.type === "checkbox") {
            return input.checked; // Ensure radio/checkbox is selected
        }
        return input.value.trim() !== ""; // Ensure text inputs are not empty
    });
}*/

///////////////////////////////Nav Function/////////////////////////////////
////////////////////////////////////////////////////////////////////////////

prevButton.addEventListener("click",()=>{
    if (currentStep>1){
        currentStep--;
        showStep(currentStep);
        updateNavigation();
    }
});

nextButton.addEventListener("click", ()=>{
    if(currentStep<steps.length){
        currentStep++;
        showStep(currentStep);
        updateNavigation();
    }
})

//////////////////////////Listen for Inputs/////////////////////////////////
////////////////////////////////////////////////////////////////////////////

steps.forEach((step,index) => {
    const inputs = step.querySelectorAll(".input-box");
    inputs.forEach(input => {
        input.addEventListener("input",function(){
            if (checkInputs(index+1)) {
                showStep(index+1);
            }
        });
    });
});

//////////////////////////////Signature/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    document.getElementById('clearButton').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

//////////////////////////////Year//////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
    const yearSelects = document.querySelectorAll(".input-box[name='year']");
    const currentYear = new Date().getFullYear();
    const startYear = 1950;
  
    yearSelects.forEach(yearSelect => {
      for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
      }
    });
});




//////////////////////////////Initilize/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

showStep(currentStep);



///////////////////////History Add/Remove Button/////////////////////////////
////////////////////////////////////////////////////////////////////////////

document.getElementById("add-employment").addEventListener("click", function() {
    const employmentHistory = document.getElementById("employment-history");
    const formSteps = employmentHistory.getElementsByClassName("form-step");
    const lastFormStep = formSteps[formSteps.length - 1];

    // Clone the last form-step
    const newFormStep = lastFormStep.cloneNode(true);

    // Update the heading for the new form
    const newNumber = formSteps.length + 1;
    newFormStep.querySelector(".description").textContent = `Employment History #${newNumber}`;

    // Clear input fields in the new form
    const inputs = newFormStep.querySelectorAll("input");
    inputs.forEach(input => {
        if (input.type === "text" || input.type === "number" || input.type === "date") {
            input.value = "";
        }
    });

    // Append the new form step
    employmentHistory.appendChild(newFormStep);
});

document.getElementById("remove-employment").addEventListener("click", function() {
    const employmentHistory = document.getElementById("employment-history");
    const formSteps = employmentHistory.getElementsByClassName("form-step");

    // Remove the last form step if there's more than one
    if (formSteps.length > 1) {
        employmentHistory.removeChild(formSteps[formSteps.length - 1]);
    }
});
/*

// Utility function to get the value of selected form elements
function getInputValue(selector, type = 'value') {
  const element = document.querySelector(selector);
  if (!element) return null;

  // If it's a radio button or checkbox, return the selected value
  if (element.type === 'radio' || element.type === 'checkbox') {
    return element.checked ? element.value : null;
  }
  
  // For other types (e.g., text, date), simply return the value
  return element[type];
}

// Collect form data
const formData = {
  airport: getInputValue('input[name="option"]:checked'),
  position: getInputValue('input[name="position"]:checked'),
  is18: getInputValue('input[name="yes18"]:checked'),
  workType: getInputValue('input[name="worktype"]:checked'),
  overtime: getInputValue('input[name="overtimePossible"]:checked'),
  firstName: getInputValue('#first-name'),
  lastName: getInputValue('#last-name'),
  address: getInputValue('#address'),
  city: getInputValue('#city'),
  state: getInputValue('#state'),
  zip: getInputValue('#zip'),
  phoneNumber: getInputValue('#phoneNumber'),
  email: getInputValue('#email'),
  dob: getInputValue('#dob', 'value'),
  startDate: getInputValue('#startDate', 'value'),
  shifts: Array.from(document.querySelectorAll('input[name="shifts"]:checked')).map(checkbox => checkbox.value),
};

// Output form data (or use it as needed)
console.log(formData);

*/