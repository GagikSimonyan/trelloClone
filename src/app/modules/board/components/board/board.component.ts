import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksList } from '../../models/tasks-list.model';
import { TasksListService } from '../../services/tasks-list/tasks-list.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;

  listNameForm = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]);
  tasksLists: TasksList[] = [];
  isClicked: boolean = false;


  constructor(private tasksListService: TasksListService) { }

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
      .subscribe((data) => {
        this.tasksLists = data.sort((a, b) => a.position - b.position);
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
    console.log(event);
    console.log(event.container.data);
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.tasksLists = this.moveTaskList(event.container.data, event.previousIndex, event.currentIndex)

    this.tasksListService.updateTasksPositions(this.tasksLists).subscribe(tasks => {
      debugger;
      // this.tasksLists = tasks;
    })
  }

  moveTaskList(arr: TasksList[], fromIndex: number, toIndex: number) {
    
    let elem = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, elem);

    arr.forEach((list, index) => {
      list.position = index + 1;
    });

    return arr;
  }
}
