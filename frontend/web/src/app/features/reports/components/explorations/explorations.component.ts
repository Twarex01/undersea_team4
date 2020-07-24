import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExplorationReport } from '../../models/exploration-report';

@Component({
  selector: 'app-explorations',
  templateUrl: './explorations.component.html',
  styleUrls: ['./explorations.component.css']
})
export class ExplorationsComponent implements OnInit {

  @Input() explorationReports: ExplorationReport[] = [];
  @Input() prevRound: number = 0;
  @Output() roundChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onChosenRoundChanged(round: number){
    this.roundChanged.emit(round);
  }

}
