import { TasksListService } from './../../services/tasks-list/tasks-list.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() card!: Array<string>;
  @ViewChild('cardInput') cardInput!: ElementRef<HTMLInputElement>;

  isClicked: boolean = false;

  constructor(private tasksListService: TasksListService) { }

  ngOnInit(): void {
  }

  showEditPopup() {
    this.isClicked = !this.isClicked;
    setTimeout(() => this.cardInput.nativeElement.focus());
  }

  closeEditPopup() {
    this.isClicked = !this.isClicked;
  }

  editCardTitle() {
    console.log('aaa', this.card);
    // this.tasksListService.updateCard()
  }

}
