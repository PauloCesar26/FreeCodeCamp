const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");
const animationData = [
    //objeto que representa o primeiro quadro da animaçao 
    {
        inputVal: 5,
        addElDelay: 1000,
        msg: "decimalToBinary(5) returns '10' + 1 (5 % 2). Then it pops off the stack.",
        showMsgDelay: 15000,
        removeElDelay: 20000,
    },
    {
        inputVal: 2,
        addElDelay: 1500,
        msg: "decimalToBinary(2) returns '1' + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.",
        showMsgDelay: 10000,
        removeElDelay: 15000,
    },
    {
        inputVal: 1,
        addElDelay: 2000,
        msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
        showMsgDelay: 5000,
        removeElDelay: 10000
    },
];

//function for to actually do the decimal to binary conversion
const decimalToBinary  = (input) => {
    //Converter um valor para string, mesmo valores falsos com nulo e indefinido, usar a função String()
    if(input === 0 || input === 1){
        return String(input);
    }
    else{
        return decimalToBinary(Math.floor(input / 2)) + (input % 2);
    }
};

const showAnimation = () => {
    //function setTimeout() recebe dois argumento, 1 função arrow e 2 um numero que representa o tempo de espera antes de executar a função de retorno(=>)
        //setTimeout() é uma function assincrona(async) que significa que ela não interrompe a execução do resto do codigo
            //sobre function async: Uma das vantagens é que ela permite escrever codigo não bloqueante 
                //codigo async funciona da seguinte forma: pode iniciar uma operação async e outras partes do codigo continua funcionando enquanto a operação executa
    // setTimeout(() => {
    //     console.log("Code");
    // }, 1000);
    result.innerText = "Call Stack Animation";

    animationData.forEach((obj) => {
        //tempo armazendado para cada quadro de animação armazenado em addElDelay, usar setTimeout para configurar o atraso para adicionar elementos ao DOM
        //add p ao DOM
        setTimeout(() => {
            animationContainer.innerHTML += `
            <p id="${obj.inputVal}" class="animation-frame">
                decimalToBinary(${obj.inputVal})
            </p>
            `;
        }, obj.addElDelay);
        //atualiza o texto de cada p
        setTimeout(() => {
            document.getElementById(obj.inputVal).textContent = obj.msg;
        }, obj.showMsgDelay);
        //remove os p do DOM
        setTimeout(() => {
            document.getElementById(obj.inputVal).remove();
        }, obj.removeElDelay);
    });

    setTimeout(() => {
        result.textContent = decimalToBinary(5);
    }, 20000);
};

//function para verificar o valor no elemento de entrada numerica o input sempre que o usuario clicar no botão converter
const checkUserInput = () => {
    //var para armazenar o num convertido e poder usar em toda a função
    const inputInt = parseInt(numberInput.value);

    //operador (!) = NOT, ele verifica se a variavel é falso por exemplo:
    //const num = 0;
    //console.log(num === 0); // true, o console mostra que a variavel é indefinida pq é zero
    //console.log(!num); // true, então o console pergunta se a variavel num é indefinida, ele responde verdadeiro(sim)

    //alerta o usuario se o valor inserido é valido
        //verificar se o valor retornado pela função parseInt() é um num ou não, para isso usar a função isNaN() que recebe uma string ou num como argumento e retorna true se for avaliado com NaN
            //parseInt() converte uma string em um num inteiro
    if(!numberInput.value || isNaN(inputInt) || inputInt < 0){ 
        alert("Please provide a decimal number greater than or equal to 0");
        return;
    }

    if(inputInt === 5){
        showAnimation();
        return;
    }

    result.textContent = decimalToBinary(inputInt);
    numberInput.value = "";
}

//usuario clicar no botão convert o numero do input vai ser exibido no console
convertBtn.addEventListener("click", checkUserInput);
//evento keydown é disparado quando o usuario clica em qualquer tecla do teclado
numberInput.addEventListener("keydown", (e) => {
    //verifica se a chame do parametro (e) é o enter, se for ele vai exbibir o numero
    if(e.key === "Enter"){
        checkUserInput();
    }
}); 