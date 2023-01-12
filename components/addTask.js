import { uniqueDates } from '../services/date.js';
import { checkComplete } from './checkComplete.js';
import { deleteIcon } from './deleteIcon.js';
import { displayTasks } from './readTasks.js';


//Creamos una funcion para agregar las tareas
export const addTask = (evento) => {
  evento.preventDefault();
  
  const list = document.querySelector('[data-list]');
  const input = document.querySelector('[data-form-input]');
  const calendar = document.querySelector("[data-form-date]");

  const value = input.value;
  const date = calendar.value;
  const dateFormat = (moment(date).format("DD/MM/YYYY"));

  if( value === "" || date === ""){
    return;
  };

  input.value = '';
  calendar.value = "";

  //Creamos la constante para corroborar la tarea completada
  const complete = false;


  //Creamos el objeto
  const taskObj = {
    value,
    dateFormat,
    complete,
    id: uuid.v4(),
  };

  //Inicializamos la card list vacia
  list.innerHTML = "";


  //Creamos la lista de tareas
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  //Fin tareas

  //Agregamos las tareas con push
  taskList.push(taskObj);

  
  //Para guardar info en ele navegador utilizamos dos formas
  //La primera es sessionStorage (La informacion solo existe mientras la pestaña este abierta)
  //sessionStorage.setItem("task", JSON.stringify(taskObj));

  //La segunda es localStorage (almacena la informacion de forma permanente)
  localStorage.setItem("tasks", JSON.stringify(taskList));

  //Se llama la funcjon q creamos para actualizar la card con return
  displayTasks();


  /*const task = createTask(taskObj);
  list.appendChild(task);*/
}



export const createTask = ({value, dateFormat, complete, id}) => {
  
  const task = document.createElement('li');
  task.classList.add('card');
  //backticks
  const taskContent = document.createElement('div');

  //Damos estilo al complete cuando se recargue la pagina
  const check = checkComplete(id)
  if(complete){
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');

  }

  const titleTask = document.createElement('span');
  titleTask.classList.add('task');
  titleTask.innerText = value;
  taskContent.appendChild(check);
  taskContent.appendChild(titleTask);
  // task.innerHTML = content;

  /*
  //Creamos el elemento "span" para la fecha
  const dateElement = document.createElement("span");
  dateElement.innerHTML = dateFormat
  //Fin de span
  */
  task.appendChild(taskContent);
  task.appendChild(dateElement);
  task.appendChild(deleteIcon(id));
  return task
};
