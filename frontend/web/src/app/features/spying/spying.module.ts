import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpyingRoutingModule } from './spying-routing.module';
import { SpyingPageComponent } from './pages/spying.page/spying.page.component';


@NgModule({
  declarations: [SpyingPageComponent],
  imports: [
    CommonModule,
    SpyingRoutingModule
  ]
})
export class SpyingModule { }
