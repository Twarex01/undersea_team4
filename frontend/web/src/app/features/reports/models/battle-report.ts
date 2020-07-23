import { ReportResourceChanges } from "./report-resource-changes";
import { ReportUnits } from "./report-units";

export interface BattleReport {
    attackerCountryName: string;
    attackerArmy: ReportUnits[];
    attackerPower: number;
    defenderCountryName: string;
    defenderPower: number;
    isSuccessful: boolean;
    resourceChanges: ReportResourceChanges[];
    unitsLost: ReportUnits[];
    round: number;
}