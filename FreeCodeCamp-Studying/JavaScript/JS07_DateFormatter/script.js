const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

// Um construtor é como uma função regular, mas começa com uma letra maiúscula e é inicializado com o operador new.
// construtor Date() com o new cria um objeto Date que retorna uma string com a data, horas atuais
const date = new Date(); 
// .getDate() retorna um numero entre 1 e 31 que representa o dia do mes
const day = date.getDate();
// .getMonth() retorna um numero entre 1 e 11 que representa o mes da data fornecida, nesse metdodo tem que somar um para chegar a 12(dez)
const month = date.getMonth() + 1;
// .getFullYear() retorna um numero que representa o ano da data
const year = date.getFullYear();
// .getHours() retorna um numero entre 0 e 23 que represnta a hora da data fornecida
const hours = date.getHours();
// .getMinutes() retorna uma numero entre 0 e 59 que representa os minutos 
const minutes = date.getMinutes();

const formattedDate = `${day} - ${month} - ${year}`;
currentDateParagraph.textContent = formattedDate;

//metodo split() é usado para dvidir uma string em substrings, retornando como elementos de uma matriz
// const exampleSentence = "selur pmaCedoCeerf".split("").reverse().join("");
// console.log(exampleSentence);

// o evento chage é usado para detecta se um elemento html foi alterado, o valor dele
dateOptionsSelectElement.addEventListener("change", () => {
    switch(dateOptionsSelectElement.value){
        case "yyyy-mm-dd":
            currentDateParagraph.textContent = formattedDate.split('-').reverse().join('-'); 
        break;
        case "mm-dd-yyyy-h-mm":
            currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
        break;
        default:
            currentDateParagraph.textContent = formattedDate;
    }
});