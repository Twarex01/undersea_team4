import { Component, OnInit, Input } from '@angular/core';
import { Upgrade } from '../../upgrade';

@Component({
  selector: 'app-upgrade-card-item',
  templateUrl: './upgrade-card-item.component.html',
  styleUrls: ['./upgrade-card-item.component.css']
})
export class UpgradeCardItemComponent implements OnInit {

  @Input() upgrade: Upgrade;

  constructor() { }

  ngOnInit(): void {
  }

}
