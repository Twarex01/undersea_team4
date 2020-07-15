import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Unit } from '../../unit';
import { UnitService } from '../../services/unit.service';

@Component({
  selector: 'app-unit-card-item',
  templateUrl: './unit-card-item.component.html',
  styleUrls: ['./unit-card-item.component.css']
})
export class UnitCardItemComponent implements OnInit {

  @Input() unit: Unit;

  constructor(private unitService: UnitService) { }

  ngOnInit(): void {
  }

  changeNumberOfUnitsToBuy(num: number){
    if(this.unit.numToBuy === 0 && num < 0)
      return;
    this.unit.numToBuy += num;
  }

}
