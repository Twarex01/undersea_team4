import { Injectable } from '@angular/core';
import { LoginClient, RegisterClient, ILoginDTO, LoginDTO, FileResponse, RegisterDTO } from '../../shared/clients';
import { JwtHelperService } from '@auth0/angular-jwt';

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

}