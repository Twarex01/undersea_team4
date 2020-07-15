import { Component, OnInit, Input } from '@angular/core';
import { Unit } from '../../unit';

@Component({
  selector: 'app-choose-unit',
  templateUrl: './choose-unit.component.html',
  styleUrls: ['./choose-unit.component.css']
})
export class ChooseUnitComponent implements OnInit {

  @Input() units: Unit[];

  constructor() { }

  ngOnInit(): void {
  }

}
