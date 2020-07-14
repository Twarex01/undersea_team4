import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username = new FormControl();
  password = new FormControl();
  passwordConfirm = new FormControl();
  countryName = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
