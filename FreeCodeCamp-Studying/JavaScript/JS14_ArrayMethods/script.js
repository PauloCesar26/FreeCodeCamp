//the .reduce() method takes an array and applies a function to condense the array into a single value
    //reduce takes a callback () => {}, this callback, takes at lest two parameters, the first is 
    //the accumuldator and the second is the current element in the array
    //metohod reduce takes a second argument thai is used ar the initial value of the accumulator
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
    //in calculating the median is to ensure the list of numbers is sorted from lest to greatest
        //.sort() method mutates the original array - it modifies the order of the elements directly
        //.toSorted() method, which creates a new array without altering the original
    const sorted = array.toSorted((a, b) => a - b);
    const median =
        sorted.length % 2 === 0
      ? getMean([sorted[sorted.length / 2], sorted[sorted.length / 2 - 1]])
      : sorted[Math.floor(sorted.length / 2)];

    return median;
};

const getMode = (array) => {
    const counts = {};

    array.forEach(el => 
        counts[el] = counts[el] ? counts[el] + 1 : 1
    );
    //"new Set" is a data structure that only allows unique values, pass an array into the set constructor, it will remove any duplicate values
    //"Object.values" serves to return an array containing all the values of the enumerable properties of an object
        //it extracts all the values associated with an object keys and organizes them into a new array
    if(new Set(Object.values(counts)).size === 1){
        return null;
    }
    //find the value that appears with more frequency
    const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a]) [0];
    const mode = Object.keys(counts).filter((el) => counts[el] === counts[highest]);

    return mode.join(", ");
};

const getRange = (array) => {
    return Math.max(...array) - Math.min(...array);
};

const getVariance = (array) => {
    const mean = getMean(array);

    const variance = array.reduce((acc, el) => {
        const difference = el - mean;
        const squared = difference ** 2;
        
        return acc + squared;
    }, 0) / array.length;

    return variance;
};

const getStandardDeviation = (array) => {
    const variance = getVariance(array);
    //Math object has a .sqrt() method specifically for finding the square root of a number.
    const standardDeviation = Math.sqrt(variance);
    return standardDeviation;
};

//function is called when the form is submitted
const calculate = () => {
    //find the number that was entered in the #numbers input field
    const value = document.querySelector("#numbers").value;
    //the .split() method takes a string and splits it into an array of strings
        //can pass it a string of characters or a RegEx to use as a separator
    const array = value.split(/,\s*/g);
    //the value of an input element is always a string, even if the input type is "number"
        //convert this array of strings into an array of numbers, to do this, can use the .map() method
        //.map crates a new array, instead of mutating the original array  
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));

    const mean = getMean(numbers);
    const median = getMedian(numbers);
    const mode = getMode(numbers);
    const range = getRange(numbers);
    const variance = getVariance(numbers);
    const standardDeviation = getStandardDeviation(numbers);

    document.querySelector("#mean").textContent = mean;
    document.querySelector("#median").textContent = median;
    document.querySelector("#mode").textContent = mode;
    document.querySelector("#range").textContent = range;
    document.querySelector("#variance").textContent = variance;
    document.querySelector("#standardDeviation").textContent = standardDeviation;
};