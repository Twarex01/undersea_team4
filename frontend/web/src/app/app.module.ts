import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { StatusBarComponent } from './core/status-bar/status-bar.component';
import { MenuComponent } from './core/menu/menu.component';
import { ProfileComponent } from './core/profile/profile.component';
import { BasicFormCardComponent } from './core/basic-form-card/basic-form-card.component';
import { IconBoxComponent } from './core/icon-box/icon-box.component';

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
    IconBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
