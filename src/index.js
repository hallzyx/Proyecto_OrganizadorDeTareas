import './styles.css';

//import './reset.css';
import {Todo,TodoList} from "./classes";
import { crearTodoHtml, capturarInput } from './js/componentes';

export const todoList=new TodoList();

let tareabox=document.querySelector(".new-todo");
let listaDeTareas=document.querySelector(".todo-list");
let tareas=listaDeTareas.querySelectorAll("div");
let contador=document.querySelector(".todo-count");




/*for(const todo of todoList.todos){
    crearTodoHtml(todo);
}*/

todoList.todos.forEach(todo=>crearTodoHtml (todo));

contador.children[0].textContent=`${todoList.calcularPendientes()}`;




 
  





  


  


