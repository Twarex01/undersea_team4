import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpgradesPageComponent } from './pages/upgrades.page/upgrades.page.component'


const routes: Routes = [
  { 
    path: '',
    component: UpgradesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpgradesRoutingModule { }
