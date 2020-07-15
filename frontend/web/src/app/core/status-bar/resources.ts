export interface Resources {
    army: {
        id: number;
        name: string;
        count: number;
    } [];
    products: {
        id: number;
        output: number;
        count: number;
    } [];
    population: number;
    armyCapacity: number;
    buildings: {
        id: number;
        name: string;
        progress: number;
        count: number;
    } [];
}