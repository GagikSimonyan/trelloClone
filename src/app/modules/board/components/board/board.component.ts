import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TasksList } from '../../models/tasks-list.model';
import { TasksListService } from '../../services/tasks-list/tasks-list.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  
  tasksList: TasksList[] = [];
  @ViewChild('textInput') textInput!: ElementRef<HTMLInputElement>;
  listNameForm = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]);
  isClicked: boolean = false;
  

  constructor(
    private tasksListService: TasksListService
  ) {}

  ngOnInit() {
    this.getList();
  }

  showPopup() {
    // this.tasksListService.addList()
    this.isClicked = !this.isClicked;
    setTimeout(() => this.textInput.nativeElement.focus());
  }


  closePopup() {
    this.isClicked = !this.isClicked;
    this.listNameForm.patchValue('');
  }

  addList() {
    this.textInput.nativeElement.focus();
    if (this.listNameForm.value.trim()) {
      this.tasksListService.addList(this.listNameForm.value)
      // .pipe(first())
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
      console.log(this.tasksList);
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
