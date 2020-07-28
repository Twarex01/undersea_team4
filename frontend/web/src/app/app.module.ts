import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

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
import { LoginClient, RegisterClient, RoundClient, API_BASE_URL } from './shared/clients';
import { MenuLogoComponent } from './core/menu-logo/menu-logo.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { ToastInterceptor } from './toast-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MainLayoutComponent,
    StatusBarComponent,
    MenuComponent,
    ProfileComponent,
    BasicFormCardComponent,
    MenuLogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ToastInterceptor, multi: true },
    AuthGuardService,
    LoginClient,
    RegisterClient,
    RoundClient,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: API_BASE_URL, useValue: 'https://localhost:5001' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
