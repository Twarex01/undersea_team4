import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Unit } from '../../unit';
import { Player } from '../../player';

@Component({
  selector: 'app-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.css']
})
export class AttackComponent implements OnInit {

  @Input() units: Unit[];
  @Input() players: Player[];
  @Output() selectedPlayerChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedPlayerChanged(id: number) {
    this.selectedPlayerChanged.emit(id);
  }

}
