const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
//matriz armazenara todas as tarefas junto com seus dados, titulo, data e descrição
const taskData = JSON.parse(localStorage.getItem("data")) || [];
//vriavel usada para rastrear o estado ao editar e descartar tarefas
let currentTask = {};
//remover caracter especial do nome, descrição
const removeSpecialChars = (val) => {
    return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '');
}

// 1 - função usada para adicionar os valores de entrada ao taskData
const addOrUpdateTask = () => {
    if(!titleInput.value.trim()){
        alert("Please provide a title");
        return;
    }
    //metodo de array findIndex() encontra e retorna o indice do primeiro elemento em um array que atende os criterios especificado na função de retorno
    // dataArrIndex fornece o indice de cada tarefa
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

    //usuario criar uma tarefa vai ser salva em um objeto
    const taskObj = {
        id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: removeSpecialChars(titleInput.value),
        date: dateInput.value,
        description: removeSpecialChars(descriptionInput.value)
    };
    

    if(dataArrIndex === -1){
        taskData.unshift(taskObj); //unshift() é um metodo de matriz usado para adicionar um ou mais elementos ao inicio de uma matriz
    }
    else{
        taskData[dataArrIndex] = taskObj;
    }

    localStorage.setItem("data", JSON.stringify(taskData));

    updateTaskContainer();
    reset();
};

// 2 - função usada para adicionar tarefas ao DOM 
const updateTaskContainer = () => {
    tasksContainer.innerHTML = "";

    //exibir a tarefa que foi salva no taskData usando um loop
    taskData.forEach(({id, title, date, description}) => {
        tasksContainer.innerHTML += `
            <div class="task" id="${id}">
                <p><strong>Title:</strong>${title}</p>
                <p><strong>Date:</strong>${date}</p>
                <p><strong>Description:</strong>${description}</p>
                <button type="button" class="btn" onclick="editTask(this)">Edit</button>
                <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
            </div>
        `;
    });
};

//função para deletar
const deleteTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id); //encontrar o indice da tarefa que deseja excluir

    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1); //splice() é um metodo de matriz que modifica matrizes removendo, substituindo ou adicionando elementos em um indice especifico, ele retorna os elementos removidos
    //splice recebe 3 argumentos, o primeiro é o indice obrigatorio no qual começa, o segunda é o numero de items a serem removidos
    localStorage.setItem("data", JSON.stringify(taskData));
};

//função para editar
const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);

    currentTask = taskData[dataArrIndex]; //notação de colchetes para recuperar a tarefa a ser editada da matriz taskData

    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;

    addOrUpdateTaskBtn.innerText = "Update Task";

    taskForm.classList.toggle("hidden"); 
}


//function para limpar os campos depois de adicionar uma tarefae tambem fechar o modal para que o usuario viualize a tarefa adicionada 
const reset = () => {
    addOrUpdateTaskBtn.innerText = "Add Task";

    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";

    taskForm.classList.toggle("hidden"); 
    currentTask = {}; //vai ser usado para guardar a tarefa que o usuario pode ter adicionado
};

if(taskData.length){
    updateTaskContainer();
}


openTaskFormBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden"); //metodo toggle() add a classe se não estiver presente no elemento e remove se estiver presente
});

closeTaskFormBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value; //verificar se tem valores nos campos de entrada
    //se o usuario decidir editar a tarefa, mas não fazer alteração antes de fechar o formulario, não tem necessidade de exibir o modal com os botões
    const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

    if(formInputsContainValues && formInputValuesUpdated){ //adicionando formInputValuesUpdated ao if, os botões do modal não serão exibidos ao usuario se ele não tiver feito alteração
        confirmCloseDialog.showModal(); //metodo showModal() é usado para exibir o modal
    }
    else{
        reset(); //se não houver alteração, função reset limpa os campos e fecha o form
    }
});

//usuario clicar no botão cancel
cancelBtn.addEventListener("click", () => {
    //vai fechar o modal que mostra os votão e o usuario podera continuar editando o form
    confirmCloseDialog.close(); //elemento de dialogo do html tem o metodo close() que é usado para fechar a caixa de dialogo
});

//usuario clicar no botão discard
discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close(); // fechar o modal que mostra os botões
    reset();
});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); //impedir o navegador de recarregar a pagina apos o envio do formulario

    addOrUpdateTask();
});

  
//Localstorage oferece métodos para salvar, recuperar e excluir itens. Os itens que você salva podem ser de qualquer tipo de dado JavaScript.
//o método setItem() é usado para salvar um item, e o método getItem() recupera o item.
//remover utilizar o método removeItem() ou se você quiser excluir todos os itens no armazenamento, você pode usar clear()
//tudo que salva no localstorege precisa estar no formato de string, para fazer isso deve usar JSON.stringify() 
// localStorage.setItem("data", JSON.stringify(myTaskArr));

// localStorage.clear();

// const getTaskArr = localStorage.getItem("data")
// console.log(getTaskArr)

// const getTaskArrObj = JSON.parse(localStorage.getItem("data"));
// console.log(getTaskArrObj);