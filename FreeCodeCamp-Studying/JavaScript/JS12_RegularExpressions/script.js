const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");
//Expressão regular (regex)
    //Elas podem receber sinalizadores para modificar seu comportamento
    //sinalidazor i: pode ser usado para fazer com que a expressão ignore 
        //maiusculo e minusculo, fazendo aceitar hello, HELLOe Hello
    //"|" é usado para corresponder o texto da esquerda ou da direita
const helpRegex = /please help|assist me/i;
//expressão regular que corresponde a menções de valores em dolares
    //usando a classe de caracteres é definida por [] e corresponde a qualquer caracter dentro dele
    //Por exemplo, [a-z] corresponde a qualquer caractere de a a z.
const dollarRegex = /[0-9] dollars/i;

const denyList = [helpRegex, dollarRegex];
//Função está return implicitamente
//.match() metodo das strings, que aceita uma expressão regex(regular) como
    //argumento e determina se a string corresponde a essa expressão 
//.test() metodo que testa se uuma string corresponde ao padrão a diferença entre
    //diferente do match ele retorna um valor boolean indicando se a string é true ou false
//.some() metodo que aceita uma funçõa de retorno de chamada que deve receber um elemento do array como argumento
    //ele retorna true se a função de retorno rotrna true para pelo menos um elemento no array 
    //está verificando se a mensagem em qualquer das expressões regulares retorna true
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

checkMessageButton.addEventListener("click", () => {
    if(messageInput.value === ""){
        alert("Please enter a message.");
        return;
    }
    //Atualizar o texto do elemento de resultado
        //ternario para verificar a function isSpam com a message como parametro
        //se for verdadeiro vai definir como "Oh no!", caso contrario "This message"
    result.textContent = isSpam(messageInput.value) 
    ? "Oh no! This looks like a spam message." 
    : "This message does not seem to contain any spam.";

    messageInput.value = "";
});