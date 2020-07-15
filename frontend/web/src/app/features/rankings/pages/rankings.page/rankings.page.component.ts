import { Component, OnInit } from '@angular/core';
import { RankingsService } from '../../services/rankings.service';
import { Observable } from 'rxjs';
import { PlayerDTO } from '../../../../shared/clients';

@Component({
  selector: 'app-rankings.page',
  templateUrl: './rankings.page.component.html',
  styleUrls: ['./rankings.page.component.css']
})
export class RankingsPageComponent implements OnInit {

  
  palyers$: Observable<PlayerDTO[]> | undefined;

  constructor(private rankingsService: RankingsService) { }

  ngOnInit(): void {
  }

  getPlayes(){
    //this.rankingsService.getPlayerList().subscribe(palyers => this.palyers$ = palyers)
  }

}
