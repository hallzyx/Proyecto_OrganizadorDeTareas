
export class Todo{

    static constructorObj({tarea,id,completado,creado}){
        const nuevo_todo=new Todo(tarea);
        nuevo_todo.id=id;
        nuevo_todo.completado=completado;
        nuevo_todo.creado=creado;

        return nuevo_todo;
    }


    constructor(tarea){
        this.tarea=tarea;
        this.id= new Date().getTime();
        this.completado=false;
        this.creado=new Date();
    }

}