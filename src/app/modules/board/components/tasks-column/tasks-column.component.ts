import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksList } from '../../models/tasks-list.model';
import { v4 as uuidv4 } from 'uuid';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-tasks-column',
  templateUrl: './tasks-column.component.html',
  styleUrls: ['./tasks-column.component.scss']
})
export class TasksColumnComponent {
  @Input() column!: TasksList;
  @Output() onRemoveList = new EventEmitter<TasksList>();

  constructor(private taskService: TaskService) { }

  addTask(newTask: Task) {
    newTask.id = uuidv4();
    newTask.listId = this.column.id;
    newTask.description = '';
    const lastTaskIndex = this.column.cards[this.column.cards.length - 1]?.position;
    newTask.position = lastTaskIndex - 1 || 1;

    this.taskService.addTask(newTask).subscribe((task) => {
      this.column.cards.push(task);
    })
  }

  removeList(column: TasksList) {
    this.onRemoveList.emit(column);
  }

  drop(event: CdkDragDrop<Task[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
        );

      event.container.data.forEach((task, index) => task.position = index + 1);
      this.taskService.updateTasksPositions(this.column.cards).subscribe();

    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      event.previousContainer.data.forEach((task, index) => task.position = index + 1);
      event.container.data.forEach((task, index) => task.position = index + 1);

      this.column.cards[event.currentIndex].listId = this.column.id;
      this.taskService.updateTasksPositions(this.column.cards).subscribe();

    }
  }
}

