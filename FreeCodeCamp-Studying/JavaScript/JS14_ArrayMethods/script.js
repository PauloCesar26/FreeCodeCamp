//the .reduce() method takes an array and applies a function to condense the array into a single value
    //reduce takes a callback () => {}, this callback, takes at lest two parameters, the first is 
    //the accumuldator and the second is the current element in the array
    //metohod reduce takes a second argument thai is used ar the initial value of the accumulator
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const testArr1 = [1, 2, 3, 4, 5];
const testArr2 = [1, 2, 3, 4, 5, 6];
const isEven = testArr2.length % 2 == 0;
console.log(isEven);

const oddListMedian = testArr1[Math.floor(testArr1.length / 2)];
console.log(oddListMedian);
const getMedian = (array) => {
    //in calculating the median is to ensure the list of numbers is sorted from lest to greatest
    const sorted = array.sort((a, b) => {
        return a - b;
    });
}

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
    const mean = getMean(numbers);
    document.querySelector("#mean").textContent = mean;
};