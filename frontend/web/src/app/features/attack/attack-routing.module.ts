import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttackPageComponent } from './pages/attack.page/attack.page.component';
import { PlayerListComponent } from './components/player-list/player-list.component';


const routes: Routes = [
  { path: '',
    component: AttackPageComponent,
    children: [
      {
        path: ':id',
        component: AttackPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttackRoutingModule { }
