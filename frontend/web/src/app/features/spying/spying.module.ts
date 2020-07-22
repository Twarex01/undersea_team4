import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpyingRoutingModule } from './spying-routing.module';
import { SpyingPageComponent } from './pages/spying.page/spying.page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [SpyingPageComponent],
  imports: [
    CommonModule,
    SpyingRoutingModule,
    SharedModule
  ]
})
export class SpyingModule { }
