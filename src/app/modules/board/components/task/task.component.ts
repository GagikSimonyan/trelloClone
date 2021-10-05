import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() card!: Task;
  @ViewChild('cardInput') cardInput!: ElementRef<HTMLInputElement>;

  isClicked: boolean = false;

  constructor(private taskService: TaskService) { }

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
    this.taskService.editTask(this.card.id, this.cardInput.nativeElement.value).subscribe()
    this.closeEditPopup();
  }

}
