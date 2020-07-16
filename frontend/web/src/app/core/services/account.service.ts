import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginClient, RegisterClient, LoginDTO, RegisterDTO } from '../../shared/clients';

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

  isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("token");
    if(token !== null)
      return !jwtHelper.isTokenExpired(token);
    return false;
  }

  logout() {
    localStorage.removeItem("token");
  }

}