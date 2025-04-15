export type AssetsData = {
    id: number;
    name: string;
    price: number;
    amount: number;
    currentValue: number;
    acquisitionValue: number;
}

export type AssetsDataWithoutId = Omit<AssetsData, 'id'>

export type MoneyData = {
    id: number;
    value: number;
}

export type MoneyDataWithoutId = Omit<MoneyData, 'id'>
