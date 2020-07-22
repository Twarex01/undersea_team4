import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpyingPageComponent } from './pages/spying.page/spying.page.component';


const routes: Routes = [
  {
    path: '',
    component: SpyingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpyingRoutingModule { }
