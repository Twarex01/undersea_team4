import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  playerNameInput: string = "";
  selectedPlayerIndex: number = 0;
  @Input() playerList: Player[];
  @Output() selectedPlayerChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onPlayerClick(index: number) {
    this.playerList[this.selectedPlayerIndex].isSelected = false;
    this.playerList[index].isSelected = true;
    this.selectedPlayerIndex = index;
    this.selectedPlayerChanged.emit(this.playerList[this.selectedPlayerIndex].id);
  }

  getPlayerList() {
    return this.playerList.filter((player) => player.name.includes(this.playerNameInput));
  }

}
