const input = document.querySelector('.toDo__input');
const submit = document.querySelector('.toDo__submit');
const toDoList = document.querySelector('.toDo__list');

submit.addEventListener('click',(event) => {
    event.preventDefault();

    const div = document.createElement('div');
    div.classList.add('toDo');

    const li = document.createElement('li');
    li.classList.add('toDo__item');
    li.innerText = input.value;


    const checkBox = document.createElement('button');
    checkBox.innerHTML = '<i class="fas fa-check"></i>';
    checkBox.classList.add('complete');

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete');
    

    div.appendChild(li);

    saveLocal(input.value);

    div.appendChild(checkBox);
    div.appendChild(deleteButton);
        
    toDoList.appendChild(div);
    input.value = '';
})

document.addEventListener('DOMContentLoaded', getToDos);

toDoList.addEventListener('click', (event) => {
    if(event.target.classList[0] == 'delete') {
        removeLocal(event.target.parentElement);
        event.target.parentNode.remove();
    }
    if(event.target.classList[0] == 'complete') {
        const parent = event.target.parentElement;
        parent.classList.toggle('completed');
    }
})

function saveLocal(toDo) {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(toDo);

    localStorage.setItem('todos',JSON.stringify(todos));
}

function getToDos() {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((toDo) => {
        const div = document.createElement('div');
        div.classList.add('toDo');

        const li = document.createElement('li');
        li.classList.add('toDo__item');
        li.innerText = toDo;


        const checkBox = document.createElement('button');
        checkBox.innerHTML = '<i class="fas fa-check"></i>';
        checkBox.classList.add('complete');

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete');
        
        div.appendChild(li);
        div.appendChild(checkBox);
        div.appendChild(deleteButton);
        toDoList.appendChild(div);
    })
}

function removeLocal(toDo) {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const index = todos.indexOf(toDo.children[0].innerText);
    todos.splice(index, 1);
    
    localStorage.setItem('todos',JSON.stringify(todos));
}