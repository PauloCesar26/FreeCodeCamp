const sortButton = document.getElementById("sort");
//Ouvinte de eventos para o sortButton
const sortInputArray = (event) => {
    event.preventDefault();
    //catch them all have the class "values-dropdown"
    //.getElementsByClassName() method returns an HTMLCollection, which is an 
        //array-like object of all the elements that have a matching class name
        //can use the spread(...) operator to convert it into an array  
    //thse values select will currently be strings and will convert them into numbers
        //use the map function to iterate over the array
        //funtion return implicit
    const inputValues = [...document.getElementsByClassName("values-dropdown")].map(dropdown =>  dropdown.value);


    
    




};

sortButton.addEventListener("click", sortInputArray);