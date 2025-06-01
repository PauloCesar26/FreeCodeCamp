const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("output");
const erro = document.getElementById("erro");

const convertNumRoman = (num) => {
    const numRoman = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];

  //array onde os resultados serão armazenados
  const res = [];

  //element[1] = 1, 4, 5, 9 | element[0] = I, IV, V
  numRoman.forEach((element) => {
    //verifica se num é > ou = a 1, 4, 5
    while(num >= element[1]){
        //.push() adicona um elemento no final do array
            //está adicionado a letra correspondente
        res.push(element[0]);
        //pega o num e - do valor numerico
        num -= element[1];
    }
  });

  return res.join("");
};

const validationInput = () => {
    const inputInt = parseInt(numberInput.value);
    let errInput = "";

    if(!numberInput.value || isNaN(inputInt)){
        errInput = "Please enter a valid number"; 
    }
    else if(inputInt < 0){
        errInput = "Please enter a number greater than or equal to 1";
    }
    else if(inputInt > 3999){
        errInput = "Please enter a number less than or equal to 3999.";
    }
    else{
        errInput = "";
    }
    
    erro.textContent = errInput;
    result.textContent = convertNumRoman(inputInt);
    numberInput.value = "";
};

convertBtn.addEventListener("click", validationInput);

numberInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        validationInput();
    }
});