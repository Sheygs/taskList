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

const addTask = e => {
  const value = inputField.value;
  if (value === ''){
    alert('Input value required!')
  }
  const li = createElement('li');
  setClassName(li,'list-group-item');
  appendChild(li,createTextNode(value));
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
   clearInput();
   e.preventDefault();
}

const filterTask = e => {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.list-group-item').forEach(task => {
     const item = task.textContent.toLowerCase();
     return item.includes(text) ?  task.style.display = 'block' : task.style.display = 'none';
    })
}

const removeTask = e => {
  if (e.target.parentElement.classList.contains('delete-item')){
     if (confirm('Are you sure ?')){
      //taskList.removeChild(e.target.parentElement.parentElement);
      e.target.parentElement.parentElement.remove();
     }
  }
}

const clearTasks = () => {
  //taskList.innerHTML = '';
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
} 

const clearInput = () => inputField.value = '';


const loadEventListeners = () => {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click',removeTask);
  clearButton.addEventListener('click', clearTasks);
  searchField.addEventListener('keyup', filterTask);
}

loadEventListeners();
