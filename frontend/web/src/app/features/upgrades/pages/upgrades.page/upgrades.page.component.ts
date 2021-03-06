import { Component, OnInit, Inject } from '@angular/core';
import { Upgrade } from '../../models/upgrade';
import { UpgradeService } from '../../services/upgrade.service';
import { forkJoin } from 'rxjs';
import { StatusNotificationService } from '../../../../core/services/status-notification.service';
import { API_BASE_URL } from '../../../../shared/clients';

@Component({
  selector: 'app-upgrades.page',
  templateUrl: './upgrades.page.component.html',
  styleUrls: ['./upgrades.page.component.css'],
})
export class UpgradesPageComponent implements OnInit {
  selectedUpgradeIndex: number = -1;
  upgrades: Upgrade[] = [];

  constructor(
    private upgradeService: UpgradeService,
    private statusNotificationService: StatusNotificationService,
    @Inject(API_BASE_URL) public imgBaseUrl: string
  ) { }

  ngOnInit(): void {
    this.getUpgradesData();
    this.statusNotificationService.notifications.subscribe(() => this.updateUpgradesData());
  }

  updateUpgradesData() {
    this.upgrades.forEach((u) => {
      if(u.roundsLeft > 0){
        u.roundsLeft -= 1;
        if(u.roundsLeft == 0)
          u.isDone = true;
      }
      u.isSelected = false;
    })
  }

  getUpgradesData(): void {
    forkJoin(
      this.upgradeService.getCountryUpgrades(),
      this.upgradeService.getUpgradeDetails()
    ).subscribe(([countryUpgrades, upgradeDetails]) => {
      this.upgrades = [];
      upgradeDetails.forEach((upgradeDetail) => {
        const countryUpgrade = countryUpgrades.find(
          (cd) => cd.id == upgradeDetail.id
        )!;
        this.upgrades.push({
          id: upgradeDetail.id,
          imageSrc: upgradeDetail.imageSrc,
          name: upgradeDetail.name,
          roundsLeft: countryUpgrade?.roundsLeft,
          description: upgradeDetail.description,
          isDone: countryUpgrade?.roundsLeft === 0 ? true : false,
          isSelected: false,
        });
      });
    });
  }

  selectUpgrade(index: number) {
    if (this.selectedUpgradeIndex !== -1)
      this.upgrades[this.selectedUpgradeIndex].isSelected = false;
    this.selectedUpgradeIndex = index;
    this.upgrades[index].isSelected = true;
  }

  buySelectedUpgrade() {
    this.upgradeService.buyUpgrade(this.upgrades[this.selectedUpgradeIndex].id).subscribe(() => {
      this.upgrades[this.selectedUpgradeIndex].roundsLeft = 15;
      this.upgrades[this.selectedUpgradeIndex].isSelected = false;
      this.selectedUpgradeIndex = -1;
    });
  }

  isSelectedEnabledToBuy(): boolean {
    if (this.selectedUpgradeIndex === -1) return false;
    for (let i = 0; i < this.upgrades.length; i++) {
      if (!!this.upgrades[i].roundsLeft)
        return false;
    }
    const selectedUpgrade = this.upgrades[this.selectedUpgradeIndex];
    return !selectedUpgrade.isDone;
  }
}
