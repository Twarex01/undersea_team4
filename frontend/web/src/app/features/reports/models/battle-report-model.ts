import { ReportResourceChanges } from "./report-resource-changes";
import { ReportUnits } from "./report-units";

export interface BattleReportModel {
    attackerCountryName: string;
    attackerArmy: ReportUnits[];
    attackerPower: string;
    defenderCountryName: string;
    defenderPower: string;
    isSuccessful: boolean;
    resourceChanges: ReportResourceChanges[];
    unitsLost: ReportUnits[];
    round: number;
}