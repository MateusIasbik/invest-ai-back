// Ativo com ID (para retorno ao front)
export type AssetsData = {
    id: number;
    name: string;
    price: number;
    amount: number;
    currentValue: number;
    acquisitionValue: number;
  };
  
  // Ativo sem ID (usado na entrada do front-end)
  export type AssetsDataWithoutId = Omit<AssetsData, 'id'>;
  
  // Dados recebidos para atualizar ou criar usuário
  export type UpsertUser = {
    frontId: string;
    money: number;
    assets: AssetsDataWithoutId[];
  };
  
  // Dados retornados ao front-end
  export type UserDataResponse = {
    money: number;
    assets: AssetsData[];
  };
  
  // Dados recebidos para atualizar ou criar um ativo
//   export type UpsertAsset = {

//   }