import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-round',
  templateUrl: './choose-round.component.html',
  styleUrls: ['./choose-round.component.css']
})
export class ChooseRoundComponent implements OnInit {

  chosenRound: number = 1;
  actualRound: number = 20;

  constructor() { }

  ngOnInit(): void {
  }

  changeRound(num: number) {
    if(this.chosenRound == 1 && num < 0)  return;
    if(this.chosenRound == this.actualRound && num > 0) return;
    this.chosenRound += num;
  }

}
