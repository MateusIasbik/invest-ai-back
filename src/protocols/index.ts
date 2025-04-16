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
    balance: number;
}

export type MoneyDataWithoutId = Omit<MoneyData, 'id'>

export type UpsertUser = {
    frontId: string;
    assets: AssetsDataWithoutId[];
    money: number;
};

export type UserDataResponse = {
    assets: AssetsData[];
    money: number;
};