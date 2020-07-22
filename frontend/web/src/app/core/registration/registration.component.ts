import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterDTO } from '../../shared/clients';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { passwordConfirmationValidator } from './validators/passwordConfirmation';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  validationError: boolean = false;

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required),
    countryName: new FormControl('', Validators.required)
  }, { validators: passwordConfirmationValidator });

  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }
  get passwordConfirmation() { return this.registerForm.get('passwordConfirmation'); }
  get countryName() { return this.registerForm.get('countryName'); }

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.validationError = true;
      return;
    }
    this.validationError = false;
    this.accountService.register(new RegisterDTO(this.registerForm.value)).subscribe(() => {
      this.router.navigate(["/login"])
    });
  }
}
