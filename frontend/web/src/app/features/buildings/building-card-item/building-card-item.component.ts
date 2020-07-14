import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-building-card-item',
  templateUrl: './building-card-item.component.html',
  styleUrls: ['./building-card-item.component.css']
})
export class BuildingCardItemComponent implements OnInit {

  @Input() isSelected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
