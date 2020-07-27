import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-choose-round',
  templateUrl: './choose-round.component.html',
  styleUrls: ['./choose-round.component.css']
})
export class ChooseRoundComponent implements OnInit {

  chosenRound: number = 1;
  
  @Input() prevRound: number = 1;
  @Output() chosenRoundChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.chosenRound = this.prevRound;
  }

  changeRound(num: number) {
    if(this.chosenRound == 1 && num < 0)  return;
    if(this.chosenRound == this.prevRound && num > 0) return;
    this.chosenRound += num;
    this.chosenRoundChanged.emit(this.chosenRound);
  }

  setRound(num: number) {
    if(num < 1 || num > this.prevRound) {
      this.chosenRound = this.prevRound;
      return;
    }
    this.chosenRoundChanged.emit(this.chosenRound);
  }

}
