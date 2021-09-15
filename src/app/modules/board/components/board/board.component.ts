import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  // data: any[] = [];

  listForm = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]);
  isClicked: boolean = false;
  @ViewChild('textInput') textInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit() {
    // this.data = [
    //   {
    //     name: 'first list',
    //     tasks: [
    //       {
    //         name: 'task1',
    //       },
    //       {
    //         name: 'task2',
    //       }
    //     ]
    //   },
    //   {
    //     name: 'second list',
    //     tasks: [
    //       {
    //         name: 'task5',
    //       },
    //       {
    //         name: 'task6',
    //       }
    //     ]
    //   }
    // ]
  }

  showPopup() {
    this.isClicked = !this.isClicked;
    setTimeout(() => this.textInput.nativeElement.focus());
  }

  closePopup() {
    this.isClicked = !this.isClicked;
    this.listForm.patchValue('');
  }

  // lists = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];

  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }
  // }

}
