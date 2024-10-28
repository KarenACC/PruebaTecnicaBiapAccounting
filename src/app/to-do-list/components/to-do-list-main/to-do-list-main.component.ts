import { Component} from '@angular/core';
import { ToDoListService } from '../../to-do-list.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-to-do-list-main',
  templateUrl: './to-do-list-main.component.html',
  styleUrl: './to-do-list-main.component.css'
})
export class ToDoListMainComponent {
  public filteredTasks: Task[] = [];

  constructor(private toDoListService: ToDoListService){}


  get tasks():Task[]{
    return [...this.toDoListService.tasks]
  }

  onNewTask(task:Task){
    this.toDoListService.addTask(task);
  }

  onDeleteTask(task:Task){
    this.toDoListService.deleteTask(task);    
  }

  onCompleteTask(task:Task){
    this.toDoListService.handleTaskState(task);
  }

  onUpdateTask(task: Task) {
    this.toDoListService.editTask(task);
  }
}
