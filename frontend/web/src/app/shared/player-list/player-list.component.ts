import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AttackPlayer } from '../../features/attack/models/attack-player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  playerNameInput: string = "";
  selectedPlayerIndex: number = 0;
  @Input() description: string = "";
  @Input() playerList: AttackPlayer[] = [];
  @Output() selectedPlayerChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onPlayerClick(index: number) {
    this.playerList[this.selectedPlayerIndex].isSelected = false;
    let actualPlayerList = this.getPlayerList();
    let userName = actualPlayerList[index].name;

    let playerIdx = this.playerList.findIndex((player) => player.name == userName)!;
    this.playerList[playerIdx].isSelected = true;
    this.selectedPlayerIndex = playerIdx;
    this.selectedPlayerChanged.emit(this.playerList[this.selectedPlayerIndex].id);
  }

  getPlayerList() {
    return this.playerList.filter((player) => player.name.toLowerCase().includes(this.playerNameInput.trim().toLowerCase()));
  }

}
