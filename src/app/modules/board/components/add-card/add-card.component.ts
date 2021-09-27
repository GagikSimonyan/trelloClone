import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent {

  @ViewChild('cardInput') cardInput!: ElementRef<HTMLInputElement>;
  @Output() addTask = new EventEmitter<Task>()
  
  cardIsClicked: boolean = false;
  cardNameForm = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]);

  showCardPopup() {
    this.cardIsClicked = !this.cardIsClicked;
    setTimeout(() => this.cardInput.nativeElement.focus());
  }

  closeCardPopup() {
    this.cardIsClicked = !this.cardIsClicked;
    this.cardNameForm.patchValue('');
  }

  onAddCard(){
    if (this.cardNameForm.valid) {
      const newTask = new Task({title: this.cardNameForm.value});
      this.addTask.emit(newTask);
      this.closeCardPopup();
    }
  }
}
