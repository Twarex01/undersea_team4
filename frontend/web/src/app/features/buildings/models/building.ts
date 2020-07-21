export interface Building {
    id: number;
    imgSrc: string;
    name: string;
    description: string;
    count: number;
    prices: {
        price: number;
        priceTypeName: string;
    }[];
    isSelected: boolean;
    progress: number;
    buildTime: number;
}