import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  data: any[] = [];
  isClicked: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.data = [
      {
        name: 'first list',
        tasks: [
          {
            name: 'task1',
          },
          {
            name: 'task2',
          }
        ]
      },
      {
        name: 'second list',
        tasks: [
          {
            name: 'task5',
          },
          {
            name: 'task6',
          }
        ]
      }
    ]
  }

  btnClick() {
    this.isClicked = !this.isClicked;
  }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
