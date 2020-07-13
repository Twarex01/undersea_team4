import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicCardComponent } from './basic-card/basic-card.component';
import { BasicCardItemComponent } from './basic-card-item/basic-card-item.component';
import { IconBoxComponent } from './icon-box/icon-box.component';

@NgModule({
  declarations: [BasicCardComponent, BasicCardItemComponent, IconBoxComponent],
  imports: [CommonModule],
  exports: [CommonModule, BasicCardComponent, BasicCardItemComponent, IconBoxComponent]
})
export class SharedModule { }