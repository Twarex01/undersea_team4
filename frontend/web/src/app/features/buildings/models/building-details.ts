export interface BuildingDetails {
    id: number;
    name: string;
    imageSrc: string;
    description: string;
    prices: {
        price: number;
        priceTypeName: string;
    }[];
    buildTime: number;
}