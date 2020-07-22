import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpyinfoPageComponent } from './pages/spyinfo.page/spyinfo.page.component';


const routes: Routes = [
  {
    path: '',
    component: SpyinfoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpyinfoRoutingModule { }
