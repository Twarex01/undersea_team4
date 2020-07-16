import { CountryUnit } from "./country-unit";

export interface Battle {
    defenderId: number;
    army: CountryUnit[];
}