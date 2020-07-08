import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttackPageComponent } from './pages/attack.page/attack.page.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { ChooseUnitComponent } from './components/choose-unit/choose-unit.component';


const routes: Routes = [
  { path: '',
    component: AttackPageComponent,
    children: [
      {
        path: '',
        component: PlayerListComponent,
        children: [
          {
            path: ':id',
            component: ChooseUnitComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttackRoutingModule { }
