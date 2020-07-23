import { BattleReportModel } from "./battle-report-model";
import { ExplorationReport } from "./exploration-report";

export interface FullReport {
    attackReports: BattleReportModel[];
    defendReports: BattleReportModel[];
    explorationReports: ExplorationReport[];
}