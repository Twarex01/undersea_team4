import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpyinfoRoutingModule } from './spyinfo-routing.module';
import { SpyinfoPageComponent } from './pages/spyinfo.page/spyinfo.page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [SpyinfoPageComponent],
  imports: [
    CommonModule,
    SpyinfoRoutingModule,
    SharedModule
  ]
})
export class SpyinfoModule { }
