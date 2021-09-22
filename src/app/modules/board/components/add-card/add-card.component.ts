import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  cardNameForm = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]);
  @ViewChild('cardInput') cardInput!: ElementRef<HTMLInputElement>;
  cardIsClicked: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  showCardPopup() {
    this.cardIsClicked = !this.cardIsClicked;
    setTimeout(() => this.cardInput.nativeElement.focus());
  }

  closeCardPopup() {
    this.cardIsClicked = !this.cardIsClicked;
    this.cardNameForm.patchValue('');
  }

}
