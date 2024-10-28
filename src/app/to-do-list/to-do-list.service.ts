import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Task } from './interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  
  tasks: Task[] = [];
  deleted:Task[] =[]; 
  done: Task[] =[];


  constructor() {
    this.tasks = this.getTasksFromLocalStorage('tasks') || [];
    this.deleted = this.getTasksFromLocalStorage('deleted') || [];
    this.done = this.getTasksFromLocalStorage('done') || [];
   }

// EVENTO PARA AGREGAR UNA TAREA
addTask(task:Task):void{
  const newTask: Task={id:uuid(), ...task }
  this.tasks.push(newTask);   
  this.saveTasksToLocalStorage('tasks', this.tasks);
};

// ACTUALIZAR LA EDICIÓN DE UNA TAREA
editTask(task:Task){
  let id = task.id;
  let taskToEdit = this.tasks.find(task => task.id === id);
  if(taskToEdit){
    taskToEdit =task;
    this.saveTasksToLocalStorage('tasks', this.tasks)
  }
}

// MANEJAR EL ESTADO COMPLETADO DE LA TAREA 
handleTaskState(task:Task) {
  if(task.completed===true){    
    this.done.push(task);
    this.saveTasksToLocalStorage('tasks', this.tasks);
    this.saveTasksToLocalStorage('done', this.done);
  } 
  else{
    let id =task.id;
    let copyDone = this.done.filter(task => task.id != id);
    this.done = copyDone;
    this.saveTasksToLocalStorage('done', this.tasks);
    this.saveTasksToLocalStorage('tasks', this.tasks);
  }
}

deleteTask(task:Task){
  if(task.deleted===true){
    let id= task.id
    let copyTasks= this.tasks.filter(task => task.id !== id)
    this.tasks= copyTasks;      
    this.deleted.push(task);
    this.saveTasksToLocalStorage('tasks', this.tasks);
    this.saveTasksToLocalStorage('deleted', this.deleted);
  }
} 

  private saveTasksToLocalStorage(key: string, tasks: Task[]): void {
    localStorage.setItem(key, JSON.stringify(tasks));
  }

  private getTasksFromLocalStorage(key: string): Task[] | null {
    const tasksData = localStorage.getItem(key);
    return tasksData ? JSON.parse(tasksData) : null;
  }
}
