import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upgrades.page',
  templateUrl: './upgrades.page.component.html',
  styleUrls: ['./upgrades.page.component.css']
})
export class UpgradesPageComponent implements OnInit {

  upgradeSelected: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  selectUpgrade(id: number) {
    this.upgradeSelected = id;
    console.log("Upgrade:" + this.upgradeSelected);
  }

}
