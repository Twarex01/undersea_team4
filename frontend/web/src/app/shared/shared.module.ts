import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicCardComponent } from './basic-card/basic-card.component';
import { IconBoxComponent } from './icon-box/icon-box.component';

@NgModule({
  declarations: [BasicCardComponent, IconBoxComponent],
  imports: [CommonModule],
  exports: [CommonModule, BasicCardComponent, IconBoxComponent]
})
export class SharedModule { }