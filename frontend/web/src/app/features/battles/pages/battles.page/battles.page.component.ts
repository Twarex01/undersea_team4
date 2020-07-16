import { Component, OnInit } from '@angular/core';
import { BattlesService } from '../../services/battles.service';
import { Battle } from '../../battle';

@Component({
  selector: 'app-battles.page',
  templateUrl: './battles.page.component.html',
  styleUrls: ['./battles.page.component.css']
})
export class BattlesPageComponent implements OnInit {

  battles: Battle[];
  
  constructor(private battleService: BattlesService) { }

  ngOnInit(): void {
    this.battleService.getCountryBattles().subscribe((battles) => {
      this.battles = battles;
    })
  }

}
