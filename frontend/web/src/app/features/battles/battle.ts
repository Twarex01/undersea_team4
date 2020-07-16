import { UnitWithName } from "../../shared/clients";

export interface Battle {
    defenderName: string;
    units: UnitWithName[];
}