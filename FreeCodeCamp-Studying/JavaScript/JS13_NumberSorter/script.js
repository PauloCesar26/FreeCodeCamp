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
    //method .sort() the default behavior of sort is to convert the numbes values to strings and sort them alphabetically
    //a and b represent the number values in the array that will be sorted
    const sortedValues = inputValues.sort((a, b) => {
        return a - b;
    });
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
        //A selection sort relies on tracking the index of the smallest value in the array
            //variable minIndex ensures that if your current value is the smallest, it will be  swapped with itself and not be moved
        let minIndex = i;
        for(let j = i + 1; j < array.length; j++){
            console.log(array, array[j], array[minIndex]);

            if(array[j] < array[minIndex]){
                minIndex = j;    
            }    
        }
        const temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
    return array;
};

//Insertion sort
    //Algorithm works by building up a sorted array at the beginning of the list
    //It begins the sorted array with the fist element
    //Then it inspects the next element and swaps it backward into the sorted array until it is in a sorted position, and so on
const insertionSort = (array) => {
    for(let i = 1; i < array.length; i++){
        const currValue = array[i];
        let j = i - 1;

        while(j >= 0 && array[j] > currValue){
            //On each iteration of your while loop it is finding an element that is larger than your current value
                //Need to moe that element to the rigth to make room for your current value
            array[j + 1] = array[j];
            j--;
        }
        //Insert current value
        array[j + 1] = currValue;
    }
}

sortButton.addEventListener("click", sortInputArray);

