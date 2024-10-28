import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output()
  addNewTask: EventEmitter <Task> = new EventEmitter();

  public task:Task = {
    title: '',
  };

  emitTask(){
    if(this.task.title.length===0) return;
    this.addNewTask.emit(this.task);
    console.log(this.task);
    this.task= {title:''};
  }

}
