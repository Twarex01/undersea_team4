import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../models/unit';
import { UnitChnageInfo } from '../../models/unit-chnage-info';
import { UnitBuyInfo } from '../../models/unit-buy-info';

@Component({
  selector: 'app-unit-card-item',
  templateUrl: './unit-card-item.component.html',
  styleUrls: ['./unit-card-item.component.css']
})
export class UnitCardItemComponent implements OnInit {

  @Input() unit: Unit;
  @Input() unitBuyInfo: UnitBuyInfo;
  @Output() unitChange = new EventEmitter<UnitChnageInfo>();

  constructor(private unitService: UnitService) { }

  ngOnInit(): void {
  }

  canDecrease(): boolean {
    if (this.unit.numToBuy === 0 || this.unit.numToBuy < 0) {
      return false;
    }
    return true;
  }
  canIncrease(): boolean {
    if (this.unitBuyInfo.armyCapacity == this.unitBuyInfo.estimatedUnitsCount ||
      this.unitBuyInfo.estimatedPearlCost + this.unit.price > this.unitBuyInfo.pearl) {
      return false
    }
    return true;
  }

  changeNumberOfUnitsToBuy(num: number) {
    if (this.unit.numToBuy === 0 && num < 0)
      return;
    this.unit.numToBuy += num;
    this.unitChange.emit({
      countChnage: num,
      costChnage: num * this.unit.price
    });
  }

}
