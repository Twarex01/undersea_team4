import { Injectable } from '@angular/core';
import { CountryClient, BattleReport, RoundClient } from '../../../shared/clients';
import { map } from 'rxjs/operators';
import { FullReport } from '../models/full-report';
import { BattleReportModel } from '../models/battle-report-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private countryClient: CountryClient, private roundClient: RoundClient) { }

  getReports(countryId: number, round: number): Observable<FullReport> {
    return this.countryClient.getCountryReport(round).pipe(
      map((fullReportDTO) => {
        const attackReports = fullReportDTO.battleReports?.filter((br) => br.attackerID === countryId).map((ar) => this.mapBattleReportDTO(ar)) ?? [];
        const defendReports = fullReportDTO.battleReports?.filter((br) => br.defenderID === countryId).map((dr) => this.mapBattleReportDTO(dr)) ?? [];
        const explorationReports = fullReportDTO.explorationReports?.map((er) => ({
          senderCountryName: er.senderCountryName!,
          victimCountryName: er.victimCountryName!,
          sentExplorersCount: er.explorersSent,
          isSuccessful: er.successful,
          victimDefensePower: er.exposedDefensePower,
          round: er.round
        })) ?? [];
        return {
          attackReports: attackReports,
          defendReports: defendReports,
          explorationReports: explorationReports
        }
      })
    )
  }

  getCountryId(): Observable<number> {
    return this.countryClient.getCountryDeatils().pipe(
      map((cd) => cd.id)
    )
  }

  getPrevoiusRound(): Observable<number> {
    return this.roundClient.getCountryRound().pipe(
      map((cr) => {return cr.round > 1 ? cr.round-1 : cr.round})
    )
  }

  private mapBattleReportDTO(battleReportDTO: BattleReport): BattleReportModel {
    return {
      attackerCountryName: battleReportDTO.attackerName!,
      attackerArmy: battleReportDTO.attackerArmy?.map((unit) => ({
          name: unit.name!,
          count: unit.count
      })) ?? [],
      attackerPower: battleReportDTO.atkPower.toFixed(2),
      defenderCountryName: battleReportDTO.defenderName!,
      defenderPower: battleReportDTO.defPower.toFixed(2),
      isSuccessful: battleReportDTO.succesful,
      resourceChanges: battleReportDTO.loot?.map((loot) => ({
          name: loot.resourceName!,
          change: loot.amount
      })) ?? [],
      unitsLost: battleReportDTO.unitsLost?.map((ul) => ({
          name: ul.unitName!,
          count: ul.lostAmount
      })) ?? [],
      round: battleReportDTO.round
    }
  }

}
