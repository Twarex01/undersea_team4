import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingsPageComponent } from './pages/buildings.page/buildings.page.component';


const routes: Routes = [
  {
    path: '',
    component: BuildingsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingsRoutingModule { }
