import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basic-form-card',
  templateUrl: './basic-form-card.component.html',
  styleUrls: ['./basic-form-card.component.css']
})
export class BasicFormCardComponent implements OnInit {

  @Input() title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
