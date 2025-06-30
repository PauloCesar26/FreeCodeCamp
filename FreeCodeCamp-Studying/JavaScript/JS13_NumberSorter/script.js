const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
    event.preventDefault();
    //catch them all have the class "values-dropdown"
    //.getElementsByClassName() method returns an HTMLCollection, which is an 
        //array-like object of all the elements that have a matching class name
        //can use the spread(...) operator to convert it into an array  
    //thse values select will currently be strings and will convert them into numbers
        //use the map function to iterate over the array
        //funtion return implicit
    //function Number() convert strings for number, return array of number now
    const inputValues = [...document.getElementsByClassName("values-dropdown")].map(dropdown =>  Number(dropdown.value));
    const sortedValues = selectionSort(inputValues);
    updateUI(sortedValues);
};
//function to update display with the sorted numbers 
    //that takes a single array parameter
    //writing algorithms that won't immediately have a return value, set a fallback value for array to be an empty array
const updateUI = (array = []) => {
    array.forEach((num, i) => {
        const outputValueNode = document.getElementById(`output-value-${i}`);
        outputValueNode.innerText = num;
    });
};

const bubbleSort = (array) => {
    //for to iterate through the array 
        //compare elements need nasted for loop
    for(let i = 0; i < array.length; i++){
        //iterate all values except the last one
        for(let j = 0; j < array.length - 1; j++){
            console.log(array, array[j], array[j + 1]);
            //check if the current element is large than the next element
                //when if condition is true, need to swap two elements, the large element up toward the end of the array
            if(array[j] > array[j+1]){
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
};

//selection sort
    //works by finding the smallest value in the array, then swapping it with the first value in the array 
    //then it finds the next smallest value in the array and swaps it with the second value in the array 
    //it continues iteratingthrough the array until it is completely sorted 
const selectionSort = (array) => {
    for(let i = 0; i < array.length; i++){

    }
}

sortButton.addEventListener("click", sortInputArray);

//por que sou importante aqui?
//o que posso fazer para ser importante aqui? 
//como fazer a diferença?
//como chamar a atenção do chefe?
