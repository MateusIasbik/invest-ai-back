import joi from "joi";
import { AssetsDataWithoutId } from "../protocols";

export const assetSchema = joi.object<AssetsDataWithoutId>({
    name: joi.string().required(),
    price: joi.number().positive().required(),
    amount: joi.number().integer().min(1).required(),
    currentValue: joi.number().positive().required(),
    acquisitionValue: joi.number().positive().required(),
  });
  
  export const createUserDataSchema = joi.object({
    frontId: joi.string().required(),
    money: joi.number().min(0).required(),
    assets: joi.array().items(assetSchema).required()
  });