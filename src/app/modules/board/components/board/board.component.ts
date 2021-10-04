import { switchMap, tap } from 'rxjs/operators';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksList } from '../../models/tasks-list.model';
import { TasksListService } from '../../services/tasks-list/tasks-list.service';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task/task.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;

  listNameForm = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]);
  tasksLists: TasksList[] = [];
  allTasks: Task[] = [];

  isClicked: boolean = false;

  constructor(
    private tasksListService: TasksListService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.getList();
  }

  showPopup() {
    this.isClicked = !this.isClicked;
    setTimeout(() => this.listInput.nativeElement.focus());
  }

  closePopup() {
    this.isClicked = !this.isClicked;
    this.listNameForm.patchValue('');
  }

  getList() {
    this.tasksListService.getList()
      .pipe(
        tap(tasksList => this.tasksLists = this.tasksListService.getSortedLists(tasksList)),
        switchMap(() => this.taskService.getTasks()),
        tap(allTasks => this.allTasks = allTasks),
      )
      .subscribe(() => {
        this.tasksLists.forEach(tasklist => tasklist.cards = this.allTasks.filter(task => tasklist.cardsIds.includes(task.id)))
      })
  }

  addList() {
    this.listInput.nativeElement.focus();
    if (this.listNameForm.value.trim()) {
      this.tasksListService.addList(this.listNameForm.value, this.findHighestPosition())
        .subscribe((data) => {
          this.tasksLists.push(data);
        });
      this.listNameForm.patchValue('');
    }
  }

  deleteList(column: TasksList) {
    this.tasksListService.deleteList(column.id)
      .subscribe(() => {
        this.tasksLists = this.tasksLists.filter(taskList => taskList.id !== column.id);
      });
  }

  findHighestPosition(): number {
    const positions = this.tasksLists.map(tasklist => tasklist.position);
    return Math.max(...positions) + 1;
  }

  drop(event: CdkDragDrop<TasksList[]>) {

    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    event.container.data.forEach((list, index) => list.position = index + 1);
    this.tasksListService.updateTasksPositions(this.tasksLists).subscribe()
  }
}
