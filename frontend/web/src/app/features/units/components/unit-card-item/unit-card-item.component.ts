import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../models/unit';
import { UnitBuyInfo } from '../../models/unit-buy-info';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-unit-card-item',
  templateUrl: './unit-card-item.component.html',
  styleUrls: ['./unit-card-item.component.css']
})
export class UnitCardItemComponent implements OnInit {

  @Input() unit: Unit;
  @Input() unitBuyInfo: UnitBuyInfo;

  constructor(private unitService: UnitService) { }

  imgBaseUrl: string = "https://undersea.azurewebsites.net/";

  ngOnInit(): void {
  }

  canDecrease(): boolean {
    if (this.unit.numToBuy === 0 || this.unit.numToBuy < 0) {
      return false;
    }
    return true;
  }
  canIncrease(): boolean {
    if (this.unitBuyInfo.armyCapacity <= this.unitBuyInfo.estimatedUnitsCount ||
      this.unitBuyInfo.estimatedPearlCost + this.unit.price > this.unitBuyInfo.pearl) {
      return false
    }
    return true;
  }

  onInputChange(newNum: number) {
    if (newNum < 0) {
      this.unit.numToBuy = 0;
      return;
    }
    let oldNum = this.unit.numToBuy;
    let deltaNum = newNum - oldNum;
    let armyCapacityCap = this.unitBuyInfo.armyCapacity - (this.unitBuyInfo.estimatedUnitsCount);
    let pearlCap = Math.floor((this.unitBuyInfo.pearl - this.unitBuyInfo.estimatedPearlCost) / this.unit.price);

    if (this.unitBuyInfo.armyCapacity < this.unitBuyInfo.estimatedUnitsCount + deltaNum) {
      deltaNum = armyCapacityCap;
    }
    if (this.unitBuyInfo.estimatedPearlCost + (this.unit.price * deltaNum) > this.unitBuyInfo.pearl) {
      deltaNum = pearlCap;
    }
    
    this.unitBuyInfo.estimatedUnitsCount += deltaNum;
    this.unitBuyInfo.estimatedPearlCost += (deltaNum * this.unit.price);
    this.unit.numToBuy = oldNum + deltaNum;
  }

  changeNumberOfUnitsToBuy(num: number) {
    
    if (this.unit.numToBuy === 0 && num < 0)
      return;
    this.unit.numToBuy += num;
    this.unitBuyInfo.estimatedUnitsCount += num;
    this.unitBuyInfo.estimatedPearlCost += num * this.unit.price;
  }

}
