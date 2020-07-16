import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-form-card',
  templateUrl: './basic-form-card.component.html',
  styleUrls: ['./basic-form-card.component.css']
})
export class BasicFormCardComponent implements OnInit {

  @Input() title: string = "";
  @Input() form: FormGroup;
  @Output() submitted = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted.emit();
  }

}
