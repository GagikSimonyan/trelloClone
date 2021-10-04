import { TasksListService } from './../../services/tasks-list/tasks-list.service';
import { HttpClient } from '@angular/common/http';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksList } from '../../models/tasks-list.model';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-tasks-column',
  templateUrl: './tasks-column.component.html',
  styleUrls: ['./tasks-column.component.scss']
})
export class TasksColumnComponent implements OnInit {

  @Input() column!: TasksList;
  @Input() position!: number;
  @Output() onRemoveList = new EventEmitter<TasksList>();

  constructor(private tasksListService: TasksListService) { }

  ngOnInit() {
    
  }

  addTask(newTask: Task) {
    newTask.id = uuidv4();
    newTask.listId = this.column.id;
    console.log('new tasks', newTask);
  }

  removeList(column: TasksList) {
    this.onRemoveList.emit(column);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

