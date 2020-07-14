import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginClient, LoginDTO } from '../../shared/clients';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: boolean = false;

  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.error = false;
    this.accountService.login(new LoginDTO(this.loginForm.value)).subscribe((data) => {
      const reader = new FileReader();
      reader.onload = () => localStorage.setItem("token", reader.result!.toString());
      reader.readAsText(data!.data);
      this.router.navigate(["/"]);
    },
    () => {
      this.error = true;
    });
  }

}
