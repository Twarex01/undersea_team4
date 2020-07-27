import { Component, OnInit, Input } from '@angular/core';
import { Building } from '../../models/building';

@Component({
  selector: 'app-building-card-item',
  templateUrl: './building-card-item.component.html',
  styleUrls: ['./building-card-item.component.css']
})
export class BuildingCardItemComponent implements OnInit {

  @Input() building : Building | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
