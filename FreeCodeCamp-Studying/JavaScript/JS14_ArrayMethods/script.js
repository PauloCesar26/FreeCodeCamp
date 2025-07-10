const getMean = (array) => {
    //the .reduce() method takes an array and applies a function to condense the array into a single value
    const sum = array.reduce();
};

//function is called when the form is submitted
const calculate = () => {
    //find the number that was entered in the #numbers input field
    const value = document.querySelector(".value");
    //the .split() method takes a string and splits it into an array of strings
        //can pass it a string of characters or a RegEx to use as a separator
    array = value.split(/,\s*/g);
    //the value of an input element is always a string, even if the input type is "number"
        //convert this array of strings into an array of numbers, to do this, can use the .map() method
        //.map crates a new array, instead of mutating the original array  
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
};