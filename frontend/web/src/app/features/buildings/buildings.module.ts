import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingsRoutingModule } from './buildings-routing.module';
import { BuildingsComponent } from './components/buildings/buildings.component';


@NgModule({
  declarations: [BuildingsComponent],
  imports: [
    CommonModule,
    BuildingsRoutingModule
  ]
})
export class BuildingsModule { }
