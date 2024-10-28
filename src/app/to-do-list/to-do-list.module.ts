import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListMainComponent } from './components/to-do-list-main/to-do-list-main.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';



@NgModule({
  declarations: [
    ToDoListMainComponent,
    AddTaskComponent,
    TasksListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ToDoListMainComponent
  ]
})
export class ToDoListModule { }
