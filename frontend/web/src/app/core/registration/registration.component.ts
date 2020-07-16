import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterDTO } from '../../shared/clients';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    passwordConfirmation: new FormControl(),
    countryName: new FormControl()
  });


  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accountService.register(new RegisterDTO(this.registerForm.value)).subscribe(() => {
      this.router.navigate(["/login"])
    });
  }

}
