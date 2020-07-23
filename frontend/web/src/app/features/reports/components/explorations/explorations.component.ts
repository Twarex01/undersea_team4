import { Component, OnInit, Input } from '@angular/core';
import { ExplorationReport } from '../../models/exploration-report';

@Component({
  selector: 'app-explorations',
  templateUrl: './explorations.component.html',
  styleUrls: ['./explorations.component.css']
})
export class ExplorationsComponent implements OnInit {

  @Input() explorationReports: ExplorationReport[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
