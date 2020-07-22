import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AttackUnit } from '../../../attack/models/attack-unit';
import { AttackPlayer } from '../../../attack/models/attack-player';

@Component({
  selector: 'app-spying',
  templateUrl: './spying.component.html',
  styleUrls: ['./spying.component.css']
})
export class SpyingComponent implements OnInit {

  @Input() explorerUnits: AttackUnit;
  @Input() players: AttackPlayer[];
  @Output() selectedPlayerChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedPlayerChanged(id: number) {
    this.selectedPlayerChanged.emit(id);
  }

}
