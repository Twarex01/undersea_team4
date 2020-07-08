import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { LoginComponent } from './core/login/login.component';
import { RegistrationComponent } from './core/registration/registration.component';

const routes: Routes = [
  { path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'attack', loadChildren: () => import('./features/attack/attack.module').then(m => m.AttackModule) },
      { path: 'buildings', loadChildren: () => import('./features/buildings/buildings.module').then(m => m.BuildingsModule) }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
