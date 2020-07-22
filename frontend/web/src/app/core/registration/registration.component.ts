import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterDTO } from '../../shared/clients';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  serverError: boolean = false;
  serverMessage: string = "";
  validationError: boolean = false;

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required),
    countryName: new FormControl('', Validators.required)
  });


  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.registerForm.invalid) {
      this.validationError = true;
      return;
    }
    this.validationError = false;
    this.accountService.register(new RegisterDTO(this.registerForm.value)).subscribe(() => {
      this.router.navigate(["/login"])
    },
    (error) => {
      this.serverError = true;
      this.serverMessage = error.response;
    });
  }

}
