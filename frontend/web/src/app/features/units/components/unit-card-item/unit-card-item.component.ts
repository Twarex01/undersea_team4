import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-unit-card-item',
  templateUrl: './unit-card-item.component.html',
  styleUrls: ['./unit-card-item.component.css']
})
export class UnitCardItemComponent implements OnInit {

  numberOfUnitsToBuy = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeNumberOfUnitsToBuy(num: number){
    if(this.numberOfUnitsToBuy === 0 && num < 0)
      return;
    this.numberOfUnitsToBuy += num;
  }

}
