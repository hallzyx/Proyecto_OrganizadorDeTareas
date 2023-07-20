import {todoList} from "../index.js";
import {Todo,TodoList} from "../classes";



const divTodoList=document.querySelector('.todo-list');
let tareabox=document.querySelector(".new-todo");
const footerBox=document.querySelector('.footer');
let Listas=divTodoList.querySelectorAll('li');

const btnFiltro=footerBox.querySelectorAll("li");


export const crearTodoHtml=(todo)=>{
    
    const htmlTodo=`
                <li class= "${(todo.completado) ? 'completed' : ''}"  data-id=${todo.id}>
                <div class="view">
                   <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                    <label>${todo.tarea}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li>
    `;
    const div=document.createElement('div');
    div.innerHTML=htmlTodo;
    divTodoList.append(div.firstElementChild);
    
    return div.firstElementChild;
}


document.addEventListener("keydown", function(event) {
    
    if (event.key === 'Enter') {
    
        const nueva_tarea=new Todo(tareabox.value);
        if(tareabox.value!=""){
        capturarInput(todoList, nueva_tarea);
        }
        tareabox.value="";
      
    }
    ActualizarPendientes();
  });

export const ActualizarPendientes=()=>{
    let pendientes=todoList.calcularPendientes();
    let contador=document.querySelector(".todo-count");
    
    contador.children[0].textContent=`${pendientes}`;
};

document.addEventListener('click',()=>{
    ActualizarPendientes();
});

export const capturarInput=(todoList,nueva_tarea)=>{
        todoList.nuevoTodo(nueva_tarea);
        crearTodoHtml(nueva_tarea);
        Listas=divTodoList.querySelectorAll('li');
};

divTodoList.addEventListener('click',(event)=>{

    const capturarLi=event.target.parentElement.parentElement;
    const capturarDataId=capturarLi.getAttribute('data-id');

    const capturarEtiqueta=event.target.localName;

    if(capturarEtiqueta.includes('input')){
        todoList.marcarCompletado(capturarDataId);
        capturarLi.classList.toggle('completed');
    }
    else if(capturarEtiqueta.includes('button')){    
            todoList.eliminarTodo(capturarDataId);
            capturarLi.remove();
              
    }

});

footerBox.addEventListener('click',(event)=>{

    const capturarEtiqueta=event.target.localName;
    

    if(capturarEtiqueta.includes('button')){
        Listas=divTodoList.querySelectorAll('li');
        for(let i=Listas.length-1;i>=0;i--){
            console.log(Listas[i]);
            if(Listas[i].classList.contains('completed')){
                Listas[i].remove();
            }
        }
        todoList.eliminarCompletados();
        
        

       

        //console.log( todoList);
        //console.log(Listas);
    }


})

btnFiltro[0].addEventListener('click', ()=>{
    console.log("clickaso flipante1");
    Listas=divTodoList.querySelectorAll('li');
    for(let i=0; i<Listas.length;i++){
        Listas[i].setAttribute("style","display:block");
    }
       btnFiltro[0].children[0].classList.add("selected");
       btnFiltro[1].children[0].classList.remove("selected");
       btnFiltro[2].children[0].classList.remove("selected");
    


})
btnFiltro[1].addEventListener('click', ()=>{
    console.log("clickaso flipante2");

    Listas=divTodoList.querySelectorAll('li');
    for(let i=0; i<Listas.length;i++){
        Listas[i].setAttribute("style","display:none");
        if(todoList.todos[i].completado==false){
            Listas[i].setAttribute("style","display:block");
        }
    }
        btnFiltro[1].children[0].classList.add("selected");
        btnFiltro[0].children[0].classList.remove("selected");
        btnFiltro[2].children[0].classList.remove("selected");
})
btnFiltro[2].addEventListener('click', ()=>{
    console.log("clickaso flipante3");

    Listas=divTodoList.querySelectorAll('li');
    for(let i=0; i<Listas.length;i++){
        Listas[i].setAttribute("style","display:none");
        if(todoList.todos[i].completado==true){
            Listas[i].setAttribute("style","display:block");
        }
    }
       btnFiltro[2].children[0].classList.add("selected");
       btnFiltro[0].children[0].classList.remove("selected");
       btnFiltro[1].children[0].classList.remove("selected");
})

