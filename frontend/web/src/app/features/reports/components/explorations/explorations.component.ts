import { Component, OnInit, Input } from '@angular/core';
import { ExplorationReport } from '../../models/exploration-report';

@Component({
  selector: 'app-explorations',
  templateUrl: './explorations.component.html',
  styleUrls: ['./explorations.component.css']
})
export class ExplorationsComponent implements OnInit {

  @Input() explorationReports: ExplorationReport[] = [];
  @Input() prevRound: number = 0;

  chosenRound: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.chosenRound = this.prevRound;
  }

  getReports() {
    return this.explorationReports.filter((er) => er.round === this.chosenRound);
  }

  onChosenRoundChanged(round: number){
    this.chosenRound = round;
  }

}
