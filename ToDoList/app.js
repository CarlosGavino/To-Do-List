const form = document.querySelector('#formulario');
const taskView = document.querySelector('#contenido');
const container = document.querySelector('.container');

let tasks = [];

document.addEventListener('DOMContentLoaded', getTask);

form.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const coment = document.querySelector('#coment').value;

    if(title === '' || coment === ''){
        messageError('Todos los campos son obligatorios', 'error');
        return;
    } 

    let taskObj = {
        title,
        coment
    };

    if (localStorage.getItem('task') === null) {
        tasks = [...tasks, taskObj];
        localStorage.setItem('task', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('task'));
        tasks = [...tasks, taskObj];
        localStorage.setItem('task', JSON.stringify(tasks));
    }

    getTask();

};

function getTask() {

    cleanListTask();

    tasks = JSON.parse(localStorage.getItem('task')) || [];
    tasks.forEach((task, id) => {
        let {
            title,
            coment
        } = task;
        let div = document.createElement('div');
        div.classList.add('card')
        div.classList.add('mb-3');
        div.classList.add('card-body');
        div.innerHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-center">${title} - ${coment} 
            <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5 bi-archive-fill"> Delete</a>
            </li>
        `;
        taskView.appendChild(div);
    });

    resetForm();
}

function deleteTask(title) {

    let tasks = JSON.parse(localStorage.getItem('task'));
    tasks.forEach((task, i) => {
        if (task.title == title) {
            tasks.splice(i, 1)
        }
        localStorage.setItem('task', JSON.stringify(tasks));
        getTask();
    })

}

function resetForm() {
    form.reset();
}

function cleanListTask() {
    while (taskView.firstChild) {
        taskView.removeChild(taskView.firstChild);
    }
}

function messageError(message, type){
    const divMessage = document.createElement('div');
    divMessage.classList.add('text-center', 'alert'); 

    if(type === 'error') {
        divMessage.classList.add('alert-danger');
   } else {
    divMessage.classList.add('alert-success');
   }

   divMessage.textContent = message;
   container.insertBefore(divMessage, document.querySelector('.overflow-hidden'))
   setTimeout(()=>{
        divMessage.remove();
   },3000);
};