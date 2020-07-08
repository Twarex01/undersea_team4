import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankingsPageComponent } from './pages/rankings.page/rankings.page.component';


const routes: Routes = [
  { path: '', component: RankingsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankingsRoutingModule { }
