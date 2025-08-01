const isEven = (num) => num % 2 === 0 ? true : false; 
const sum = (nums) => nums.reduce((acc, el) => acc + el, 0);
const average = (nums) => sum(nums) / nums.length; 

const median = (nums) => {
    //slice method used for creating a shallow copy of the array, to extract a portion of the data and return it as a new entity, without modifying the original
        //.sort method sorts the array numerically in ascending order
    const sorted = nums.slice().sort((a, b) => a - b);
    const length = sorted.length;
    const middle = length / 2 - 1;

    return isEven(length) 
    ? average([sorted[middle], sorted[middle + 1]]) 
    : sorted[Math.ceil(middle)];
};

const spreadsheetFunctions = {
    sum,
    average,
    median,
};

//function to generate a rage of numbers
    //Array need to be the size of the range, calculate this by finding the difference between end and start and add 1 to the result
    //.fill() method which can be used to fill an array with a value
    //function range return an array with the correct length, but all of the values are the value of start
        //to fix this with .map method
const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);

//range funtion can used it to create a range of letters as well
//String.fromCharCode method is used for convert into characters
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));

const evalFormula = (x, cells) => {
    const idToText = (id) => cells.find((cell) => cell.id === id).value;

    //regex with capture group with a character class
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));

    // const elemValue = (num) => {
    //     const inner = (character) => {
    //         return idToText(character + num);
    //     };
    //     return inner;
    // };
    const elemValue = (num) => (character) => idToText(character + num);
    //back to step 45
    //function reference is a function name without the parentheses
        //function that is not called directly, but passed as reference
    const addCharacters = (character1) => (character2) => (num) => charRange(character1, character2).map(elemValue(num));
    const rangeExpanded = x.replace(rangeRegex, (match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
}

window.onload = () => {
    const container = document.getElementById("container");

    const createLabel = (name) => {
        const label = document.createElement("div");
        label.className = "label";
        label.textContent = name;
        container.appendChild(label);
    };

    const letters = charRange("A", "J");
    letters.forEach(createLabel);

    range(1, 99).forEach((number) => {
        createLabel(number);

        letters.forEach((letter) => {
            const input = document.createElement("input");
            input.type = "text";
            input.id = letter + number;
            input.ariaLabel = letter + number;
            input.onchange = update;
            container.appendChild(input);
        });
    });
};

const update = (event) => {
    //the target property of the change represents the element that changed
    const element = event.target;
    const value = element.value.replace(/\s/g, "");
    //.charAt method is used to retrieve a specific character from a string based on its index(position)    
    if(!value.includes(element.id) && value.charAt(0) === "="){

    }
}