import { Component,EventEmitter, Input, Output  } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { ToDoListService } from '../../to-do-list.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter',[
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [ 
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class TasksListComponent{
  constructor(private toDoListService: ToDoListService){}


  get tasks():Task[]{
    return [...this.toDoListService.tasks]
  }


  @Input()
  taskList: Task[] = [];
  
  // ELIMINAR UNA TAREA
  @Output()
  onDeleteTask: EventEmitter <any> = new EventEmitter();
  
  deleteTask(task:Task){
    task.deleted=true;
    this.onDeleteTask.emit(task); 
    }

  // LÓGICA PARA EDITAR UNA TAREA
  public editingTaskId: string = '';
  public errorMessage: string = '';

  @Output()
  onEditTask: EventEmitter <any> = new EventEmitter();

  enableEdit(taskId: string) {
    const task = this.taskList.find(task => task.id === taskId);
    if (!task?.completed) {
      this.editingTaskId = taskId;
      this.errorMessage = '';
    }
  }

  saveTask(task:Task) {
    if (task.title.trim() === '') {
      return;
    }
    this.editingTaskId = '';
    this.onEditTask.emit(task)
  }

  onEnterPress(event: Event, task:Task) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      this.saveTask(task);
    }
  }

  isEditing(taskId: string): boolean {
    return this.editingTaskId === taskId;
  }

  // MOSTRAR U OCULTAR MENSAJE DE TAREA VACÍA
  onInputChange(task: Task) {
    this.errorMessage = task.title.trim() === '' ? 
      'Escribe una tarea' : '';
  }

  // LÓGICA PARA MARCAR UNA TAREA COMO COMPLETADA
  @Output()
  onCompleteTask: EventEmitter <any> = new EventEmitter();
  
  completeTask(task:Task){
    task.completed = !task.completed; 
    this.onCompleteTask.emit(task); 
  }

}





