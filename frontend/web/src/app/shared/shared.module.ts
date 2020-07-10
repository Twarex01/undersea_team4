import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicCardComponent } from './basic-card/basic-card.component';
import { BasicCardItemComponent } from './basic-card-item/basic-card-item.component';

@NgModule({
  declarations: [BasicCardComponent, BasicCardItemComponent],
  imports: [CommonModule],
  exports: [CommonModule, BasicCardComponent, BasicCardItemComponent]
})
export class SharedModule { }