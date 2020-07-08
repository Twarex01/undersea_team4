import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpgradesComponent } from './components/upgrades/upgrades.component';


const routes: Routes = [
  { 
    path: '',
    component: UpgradesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpgradesRoutingModule { }
