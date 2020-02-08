//Define UI Variables
const form  = document.querySelector('form');
const inputField = document.querySelector('#task');
const searchField = document.querySelector('#search');
const taskList = document.querySelector('.list-group');
const clearButton = document.querySelector('.clear-tasks');

//Helper Methods
const createElement = HTMLElement => document.createElement(HTMLElement);
const setClassName = (HTMLElement,className) => HTMLElement.className = className;
const createTextNode = text => document.createTextNode(text);
const appendChild = (HTMLElement,child) => HTMLElement.appendChild(child);
const setAttribute = (HTMLElement,attrName,attrValue) => HTMLElement.setAttribute(attrName,attrValue);
const innerHTML = (HTMLElement,string) => HTMLElement.innerHTML = string;


const alertMessage = (msg, className, timeout) => {
  const div = document.createElement('div');
  div.className = `${className}`;
  div.appendChild(document.createTextNode(msg));
  const card = document.querySelector('#main');
  card.insertAdjacentElement('beforebegin',div);
  setTimeout(() => document.querySelector(`.${className}`).remove(), timeout);
};

const addTask = e => {
  const value = inputField.value;
  if (value === ''){
    alertMessage('Input Field Required 😑', 'error', 2000);
  }
  else {
      const li = createElement('li');
      setClassName(li,'list-group-item');
      appendChild(li,createTextNode(value));
      const a = createElement('a');
      setClassName(a,'delete-item float-right')
      setAttribute(a,'href','#');
      innerHTML( a, `<i class="fas fa-times text-danger"></i> `);
      appendChild(li,a);
      appendChild(taskList,li);
      setTaskValueInLocalStorage(value);
      clearInput();
      e.preventDefault();
  }
}

const setTaskValueInLocalStorage = task => {
  let tasks;
  if (!localStorage.getItem('tasks')){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}


const getTasks = () => {
  let tasks;
  if (!localStorage.getItem('tasks')){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } 
  tasks.forEach(task => {
    const li = createElement('li');
    setClassName(li,'list-group-item');
    appendChild(li,createTextNode(task));
    const a = createElement('a');
    setClassName(a,'delete-item float-right')
    setAttribute(a,'href','#');
    innerHTML(
       a,
       ` 
        <i class="fas fa-times text-danger"></i>
       `
      );
     appendChild(li,a);
     appendChild(taskList,li);
  })
}

const filterTask = e => {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.list-group-item').forEach(task => {
     const item = task.textContent.toLowerCase();
     return item.includes(text) ?  task.style.display = 'block' : task.style.display = 'none';
    })
}

//to treat
const removeTaskInLocalStorage = taskItem => {
  let tasks;
  if (!localStorage.getItem('tasks')){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task,index) => {
    if (taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

const removeTask = e => {
  if (e.target.parentElement.classList.contains('delete-item')){
      //taskList.removeChild(e.target.parentElement.parentElement);
      const parentElement = e.target.parentElement.parentElement;
      parentElement.remove();
      removeTaskInLocalStorage(parentElement);
      alertMessage(`Item removed 🎉`, 'success', 2000);
  }
}

const clearTaskInLocalStorage = () => localStorage.clear();

const clearTasks = () => {
  //taskList.innerHTML = '';
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  clearTaskInLocalStorage();
} 

const clearInput = () => inputField.value = '';

const loadEventListeners = () => {
  document.addEventListener('DOMContentLoaded',getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click',removeTask);
  clearButton.addEventListener('click', clearTasks);
  searchField.addEventListener('keyup', filterTask);
}

loadEventListeners();
