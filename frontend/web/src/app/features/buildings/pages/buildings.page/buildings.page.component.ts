import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.page.component.html',
  styleUrls: ['./buildings.page.component.css']
})
export class BuildingsPageComponent implements OnInit {

  selectedBuilding: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  selectBuilding(id: number) {
    this.selectedBuilding = id;
    console.log("Building" + this.selectedBuilding + " selected");
  }

}
