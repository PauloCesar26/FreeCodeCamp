const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
//prefixing a variable with "is" or has to signify that the variable represents a boolean value
let isError = false;

//function for clear characters + or -
const cleanInputString = (str) => {
    //to match characters in a string, con use regular expressions or "regex"
    //Regex in javascript is indicated by a pattern wrapped in forward slashes: /hello/
    //shorthand character class are preced with a backlash "\", the character class \s will match any whitespace character
    //Regex possui sinalizadores especificos para alterar o comportamento do padrão, os sinalizadores são adicioandos apos o fechamneto da /
        //o G significa global que dira ao padrão para continuar procurando depois de encontrar o +, - e os espaços em branco 
    const regex = /[+-\s]/g;

    //O javascript fornece um método .replace() que permite substituir caracteres em uma string por outra string.
        //ele aceita dois argumento
            //o primeiro é a sequencia de caractereesa ser substituido podendo ser uma string ou um regex
            //o segundo é a string que substitui a sequencia corresponde 
    //como strings são imutaveis o metodo replace retorna uma nova string com os caracteres substituidos
    return str.replace(regex, ""); //vai substituir o +,- e espaço em branco, por uma string vazia removendo eles 
};

//em html, as entradas numericas allow for notação exponencial, função vai detectar se tem notação cientifica 
const isInvalidInput = (str) => {
    //modificador + permite que voce correpsonda a um padrão de digitos que ocorre uma ou mais vezes
    const regex = /\d+e\d+/i;
    //o "e" em uma entrada numerica tambem pode ser E maiusculo, no regex tem uma bandeira para isso, bandeira i que significa "insensivel"
        //com essa bandeira a entrada pode ser Hello e vai ser considerada se for hello, Hello, HELLO e até hElLo

    //entradas numericas só permitem que o "e" ocorra entre dois digitos, para isso tem que usar a classe [0-9], que vai corresponder a qualquer numero, correspondendo entre 0-9
        //existe uma classe de caracteres abreviada para corresponder a qualquer digito "\d", substituir [0-9] por "\d"

    //.match() é um metodo de string que recebe um regex como argumento
        //retorna retorna uma matriz com todas as correspondências encontradas na string.
    return str.match(regex);
};

//function que permite os usuarios adicionar entrada no contador de calorias
const addEntry = () => {
    //direcionar o elemento input-container dentro do elemento que foi selecionado no entryDropdown
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    //metdo querySelectorAll() retorna um NodeList de todos os elementos que correspondem ao seletor CSS
        //NodeList é como se fosse um objeto do tipo array/lista, então pode acessar os elementos usando a notação de colchetes
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; //retornara um NodeList de todas as entradas de texto 
    //string HTML dinamica para adicionar a pagina da web
    const HTMLString = `
        <label for="${entryDropdown.value}-${entryNumber}-name">Entry #${entryNumber} Name</label>
        <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name">

        <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
        <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories"/>
    `;

    //prorpiedade innerHTML retorna um conteudo HTML dentro de um elemento 
    //metodo insertAdjacentHTML() recebe dois argumento, o primeiro é uma string que fala a posição do elemento inserido, o segundo argumento é uma string contendo o html a ser inserido
    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
};

const calculateCalories = (e) => {
    e.preventDefault();
    isError = false;
    //obter os valores das entradas que o user add
    const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
    const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
    const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
    const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
    const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");

    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    if(isError){
        return;
    }

    //começar a fazer os calculos
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    //saber se o user está com superavit calorico ou defit calorico
        //se for menor que 0, suplusOrDeficit devera ser "Surplus", caso contrario vai ser "Deficit"
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
    //metodo toLowerCse() faz com as strings vire todas minusculas
        //metodo Math.abs retorna o valor absoluto de um numero, exemplo: const num = -5; Math.abs(num);=5
    output.innerHTML = `
        <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
        <hr/>
        <p>${budgetCalories} Calories Budgeted</p>
        <p>${consumedCalories} Calories Consumed</p>
        <p>${exerciseCalories} Calories Burned</p>
    `;

    output.classList.remove('hide');
}

//function que obtera a contagem de calorias das entradas do usuario
const getCaloriesFromInputs = (list) => {
    let calories = 0;

    //usar loop for para percorrer um array e o nodelist
        //o loop for...of é usado para iterar sobre elmentos em um objeto iteravel, como um array
            //A variavel declara com const no loop representa o elemento atual que está sendo iterado
            //item é a variavel que vai receber o valor de cada lemento percorrido , list é a lista de itens que estão sendo percorridos 
    for(const item of list){
        //variavel que pegara o value atual
        const currVal = cleanInputString(item.value);
        const invalidInputMatch = isInvalidInput(currVal); //confirma se a entrada é valida 

        if(invalidInputMatch){
            alert(`Invalid Input: ${invalidInputMatch[0]}`);
            isError = true;
            return null;
        }
        //logica quando a entrada é valida
            //Number() é um construtor/function que converte algum valor em numero
                //se o valor não poder ser convertido ele retorna NaN(not a number)
        calories += Number(currVal); 
    }
    return calories;
}

const clearForm = () => {
    //Array.from() aceita um array-like que vem do querySlectorAll e retorna um array
    const inputContainers = Array.from(document.querySelectorAll('.input-container'));

    for(const container of inputContainers){
        container.innerHTML = "";
    }

    budgetNumberInput.value = "";
    output.innerText = "";
    output.classList.add('hide');
    //a difrença entre innerText e innerHTML que o innerText não rendeniza as tags HTML, ele retorna as tags e o conteudo em texto bruto
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);