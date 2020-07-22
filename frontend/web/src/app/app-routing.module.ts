import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { LoginComponent } from './core/login/login.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  { path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'attack', loadChildren: () => import('./features/attack/attack.module').then(m => m.AttackModule) },
      { path: 'buildings', loadChildren: () => import('./features/buildings/buildings.module').then(m => m.BuildingsModule) },
      { path: 'upgrades', loadChildren: () => import('./features/upgrades/upgrades.module').then(m => m.UpgradesModule) },
      { path: 'rankings', loadChildren: () => import('./features/rankings/rankings.module').then(m => m.RankingsModule) },
      { path: 'units', loadChildren: () => import('./features/units/units.module').then(m => m.UnitsModule) },
      { path: 'battles', loadChildren: () => import('./features/battles/battles.module').then(m => m.BattlesModule) },
      { path: 'spying', loadChildren: () => import('./features/spying/spying.module').then(m => m.SpyingModule)},
      { path: 'spyinfo', loadChildren: () => import('./features/spyinfo/spyinfo.module').then(m => m.SpyinfoModule)}
    ],
    canActivate: [AuthGuardService]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
