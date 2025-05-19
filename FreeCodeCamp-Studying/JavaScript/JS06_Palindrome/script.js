const checkBtn = document.getElementById("check-btn");
const inputText = document.getElementById("text-input");

const checkForPalindrome = inputText => {
    const originalInput = inputText; 
  
    if (inputText === '') {
      alert('Please input a value');
      return;
    }
}

checkBtn.addEventListener("click", () => {
    checkForPalindrome();
});