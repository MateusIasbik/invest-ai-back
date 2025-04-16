export type AssetsData = {
    id: number;
    name: string;
    price: number;
    amount: number;
    currentValue: number;
    acquisitionValue: number;
}

export type AssetsDataWithoutId = Omit<AssetsData, 'id'>

export type UpsertUser = {
    frontId: string;
    money: number;
    assets: AssetsDataWithoutId[];
};

export type UserDataResponse = {
    money: number;
    assets: AssetsData[];
};