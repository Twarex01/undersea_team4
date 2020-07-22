import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from '../../shared/clients';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { noWhitespaceValidator } from '../validators/noWhitespaceValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  serverError: boolean = false;
  serverMessage: string = "";
  validationError: boolean = false;

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, noWhitespaceValidator]),
    password: new FormControl('', [Validators.required, noWhitespaceValidator]),
  });

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if(this.loginForm.invalid) {
      this.validationError = true;
      return;
    }
    this.removeErrors();
    this.accountService.login(new LoginDTO(this.loginForm.value)).subscribe(
      (data) => {
        const reader = new FileReader();
        reader.onload = () => {
          localStorage.setItem('token', "Bearer " + reader.result!.toString());
          this.router.navigate(["/"]);
        };
        reader.readAsText(data!.data);
        localStorage.setItem('playerName', this.loginForm.value.userName);
      },
      (error) => {this.serverError = true; this.serverMessage = error.response;}
    );
  }

  removeErrors() {
    this.validationError = false;
    this.serverError = false;
  }

}
