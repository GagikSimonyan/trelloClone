import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
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


  constructor(private tasksListService: TasksListService) {}

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
      this.tasksLists = data;
    })
  }

  addList() {
    this.listInput.nativeElement.focus();
    if (this.listNameForm.value.trim()) {
      // this.tasksLists.forEach((task, index) => {
      //   task.position = index + 1;
      // })
      this.tasksListService.addList(this.listNameForm.value, this.tasksLists.length + 1)
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

  // findHighestPosition(arr: any): number {
  //   let max = arr[0].position
  //   arr.forEach((item: any) => {
  //     if (item.position > max) {
  //       max = item.position
  //     }
  //   });

  //   return max + 1
  // }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
