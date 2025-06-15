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
    //quantificador + diz que pode ter um ou mais num consecutivos, como o valor em dolar que pode ter mais de um digito
        //por exemplo a regular expression /a+/ mostra que pode ter um ou mais caracteres a consecutivos
    //() define um grupo de captura
        //por exemplo /h(i/ey) camper/ combinaria com qualquer um:hi camper ou hey camper, capturaria i ou ey de um grupo
    //? mostra que é algo opcional
        //for example o regex /colou?r/ corresponde tanto a color e colour porque o "u" é opcional 
    //\s corresponde a espaços em branco, como espaços, tubulações e novas linhas
        //* siginifa que corresponde ao caractere anterior pode estar presente 0 ou mais vezes
            //for example /ab*c/ corresponde a ac(zero ocorrecnia de b), abc(uma ocorrencia de b)
    //nesse regex não precisa do valor do grupo de captura, trnsformar ele em um grupo sem captura primite que agrupe os
        //caractres sem preservar o resultado, para criar o grupo sem captura pode add "?:" depois dos parenteses
    //?: define um grupo de captura não capturante, as coisas dentro dos () é agrupado para fazer operações(|, *, +)
        //mas o conteudo correspondido não sera armazenado como parte dos resultados capturados
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
//regex que vai procurar por strings como "free money"
    //msg spam normalmente utilizam num em vez de letras para contornar os filtros, o regex vai capturá-los
        //colocando classes[] de caracteres que corresponde a "e" e "3"
    //para o regex corresponder ao inicio do texto, tem que usar a ancora "^", que garante que começa no incio da string completa
        //para corresponder ate o final da string é usado a ancora "$"
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;

const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;

const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;

const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];
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