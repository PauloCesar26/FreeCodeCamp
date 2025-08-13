const infixToFunction = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y
};
const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));

const highPrecedence = (str) => {
    const regex = /([\d.]+)([*\/])([\d.]+)/;
    const str2 = infixEval(str, regex);
    return str2 === str ? str : highPrecedence(str2);
};

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
    "": nums => nums,
    sum,
    average,
    median,
    even: nums => nums.filter(isEven),
    someeven: nums => nums.some(isEven),
    everyeven: nums => nums.every(isEven),
    firsttwo: nums => nums.slice(0, 2),
    lasttwo: nums => nums.slice(-2),
    has2: nums => nums.includes(2),
    increment: nums => nums.map(num => num + 1), 
    random: ([x, y]) => Math.floor(Math.random() * y + x), 
    range: nums => range(...nums),
    nodupes: nums => nums.filter((item, index) => nums.indexOf(item) === index)
};

const applyFunction = (str) => {
    const noHigh = highPrecedence(str);
    const infix = /([\d.]+)([+-])([\d.]+)/;

    const str2 = infixEval(noHigh, infix);
    const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;

    const toNumberList = (args) => args.split(",").map(parseFloat);
    const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
    //.hasOwnProperty() check if a property on a given objects exists or not, method returns true or false 
        //depending on if the property is found on the object or not
    return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match); 
}
 
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
    //In Javascript it is common convetion to prefix an unused parameter with an underscore, that's why the underscore in the "match"
    const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
    const cellRegex = /[A-J][1-9][0-9]?/gi;
    const cellExpanded = rangeExpanded.replace(cellRegex, (match) => idToText(match.toUpperCase()));
    const functionExpanded = applyFunction(cellExpanded);

    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
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
        //Array.from() to convert it to an array
        element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
    }
}