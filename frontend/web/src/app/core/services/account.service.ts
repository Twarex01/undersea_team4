import { Injectable } from '@angular/core';
import { LoginClient, RegisterClient, ILoginDTO, LoginDTO, FileResponse, RegisterDTO } from '../../shared/clients';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private loginClient: LoginClient, private registerClient: RegisterClient) { }

  login(loginInfo: LoginDTO) {
    return this.loginClient.postLogin(new LoginDTO(loginInfo));
  }

  register(registerInfo: RegisterDTO) {
    return this.registerClient.postRegister(new RegisterDTO(registerInfo));
  }

}