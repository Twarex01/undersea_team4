import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AttackUnit } from '../../models/attack-unit';
import { AttackPlayer } from '../../models/attack-player';

@Component({
  selector: 'app-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.css']
})
export class AttackComponent implements OnInit {

  @Input() units: AttackUnit[];
  @Input() players: AttackPlayer[];
  @Output() selectedPlayerChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedPlayerChanged(id: number) {
    this.selectedPlayerChanged.emit(id);
  }

}
