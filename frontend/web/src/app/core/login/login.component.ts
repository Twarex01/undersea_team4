import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginClient, LoginDTO } from '../../shared/clients';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private client: LoginClient, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.client.postLogin(new LoginDTO(this.loginForm.value)).subscribe(() => {
      this.router.navigate(["/"]);
    })
  }

}
