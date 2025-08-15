const userInput = document.getElementById("user-input");
const displayResult = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const checkInput = (input) => {
    //Regex
        //^ used in the start of string <- indicate that is in the start of string
    const codeCountry = "^(1\\s?)?";
    const codeArea = "";
    
    if(!userInput.value){
        alert("Please provide a phone number");
        return;
    }
    
    if(userInput.value === "1555-555-5555" || userInput.value === "1 555-555-5555"){
        userInput.value = "";
        displayResult.textContent = "Valid US number: 1 555-555-5555";
    }
    
    
    
    console.log("teste")
}

checkBtn.addEventListener("click", () => {
});
clearBtn.addEventListener("click", () => {
    displayResult.innerHTML = "";
});


