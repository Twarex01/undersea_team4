import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BattlesPageComponent } from './pages/battles.page/battles.page.component';


const routes: Routes = [
  {
    path: '',
    component: BattlesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattlesRoutingModule { }
