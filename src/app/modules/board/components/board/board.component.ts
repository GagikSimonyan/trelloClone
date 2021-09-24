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
  tasksList: TasksList[] = [];
  isClicked: boolean = false;

  constructor(
    private tasksListService: TasksListService
  ) {}

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

  addList() {
    this.listInput.nativeElement.focus();
    if (this.listNameForm.value.trim()) {
      this.tasksListService.addList(this.listNameForm.value)
      .subscribe((data) => {
        this.tasksList.push(data);
      });
      this.listNameForm.patchValue('');
    }
  }

  getList() {
    this.tasksListService.getList()
    .subscribe((data) => {
      this.tasksList = data;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

}
