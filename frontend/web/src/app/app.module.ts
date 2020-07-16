import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { StatusBarComponent } from './core/status-bar/status-bar.component';
import { MenuComponent } from './core/menu/menu.component';
import { ProfileComponent } from './core/profile/profile.component';
import { BasicFormCardComponent } from './core/basic-form-card/basic-form-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt-interceptor';
import { AuthGuardService } from './core/services/auth-guard.service';
import { LoginClient, RegisterClient, CountryClient, RoundClient } from './shared/clients';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MainLayoutComponent,
    StatusBarComponent,
    MenuComponent,
    ProfileComponent,
    BasicFormCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, AuthGuardService, LoginClient, RegisterClient, RoundClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
