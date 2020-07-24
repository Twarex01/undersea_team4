import { NgModule } from '@angular/core';

import { BuildingsRoutingModule } from './buildings-routing.module';
import { BuildingsPageComponent } from './pages/buildings.page/buildings.page.component';
import { SharedModule } from '../../shared/shared.module';
import { BuildingCardItemComponent } from './components/building-card-item/building-card-item.component';


@NgModule({
  declarations: [BuildingsPageComponent, BuildingCardItemComponent],
  imports: [
    BuildingsRoutingModule,
    SharedModule
  ]
})
export class BuildingsModule { }
