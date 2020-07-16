import { Component, OnInit, Input } from '@angular/core';
import { AttackUnit } from '../../models/attack-unit';


@Component({
  selector: 'app-choose-unit',
  templateUrl: './choose-unit.component.html',
  styleUrls: ['./choose-unit.component.css']
})
export class ChooseUnitComponent implements OnInit {

  @Input() units: AttackUnit[];

  constructor() { }

  ngOnInit(): void {
  }

}
