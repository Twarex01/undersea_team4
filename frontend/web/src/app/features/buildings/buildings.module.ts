import { NgModule } from '@angular/core';

import { BuildingsRoutingModule } from './buildings-routing.module';
import { BuildingsPageComponent } from './pages/buildings.page/buildings.page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [BuildingsPageComponent],
  imports: [
    BuildingsRoutingModule,
    SharedModule
  ]
})
export class BuildingsModule { }
