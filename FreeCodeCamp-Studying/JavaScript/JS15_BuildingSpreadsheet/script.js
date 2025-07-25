//function to generate a rage of numbers
    //Array need to be the size of the range, calculate this by finding the difference between end and start and add 1 to the result
    //.fill() method which can be used to fill an array with a value
    //function range return an array with the correct length, but all of the values are the value of start
        //to fix this with .map method
const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);
//range funtion can used it to create a range of letters as well
//String.fromCharCode method is used for convert into characters
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));

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

        });
    });
};