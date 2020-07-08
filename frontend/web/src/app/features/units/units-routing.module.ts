import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitsPageComponent } from './pages/units.page/units.page.component';


const routes: Routes = [
  { path: '', component: UnitsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
