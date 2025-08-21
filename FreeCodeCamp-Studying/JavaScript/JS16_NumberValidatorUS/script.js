const userInput = document.getElementById("user-input");
const displayResult = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const checkInput = (input) => {
    if(!input){
        alert("Please provide a phone number");
        return;
    }
    
    //Regex
        //^ used in the start of string <- indicate that is in the start of string
        //\\s? means optional a space
    const codeCountry = "^(1\\s?)?";
    const codeArea = "(\\([0-9]{3}\\)|[0-9]{3})";
    const spaceDashes = "[\\s\\-]?";
    const phoneNumber = "[0-9]{3}[\\s\\-]?[0-9]{4}$";
    const phoneNumberComplete = new RegExp(
        `${codeCountry}${codeArea}${spaceDashes}${phoneNumber}`
    );

    const elementP = document.createElement("p");
    elementP.className = "results-text";
    
    console.log(phoneNumberComplete);
    console.log(phoneNumberComplete.test(input));
    
    phoneNumberComplete.test(input) ? (elementP.style.color = "#00471b") : (elementP.style.color = "#4d3800");
    const textElementP = document.createTextNode(`${phoneNumberComplete.test(input) ? "Valid" : "Invalid"} US number: ${input}`);

    elementP.appendChild(textElementP);
    displayResult.appendChild(elementP);   
}

checkBtn.addEventListener("click", () => {
    checkInput(userInput.value);
    userInput.value = "";
});
clearBtn.addEventListener("click", () => {
    displayResult.innerHTML = "";
});


