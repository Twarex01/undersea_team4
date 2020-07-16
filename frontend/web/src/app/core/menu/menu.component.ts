import { Component, OnInit } from '@angular/core';
import { TestRoundService } from '../services/test-round.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private testRoundServcie: TestRoundService) { }

  ngOnInit(): void {
  }

  nextRound(){
    this.testRoundServcie.testNextRound();
  }

}
