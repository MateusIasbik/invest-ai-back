import { faker } from "@faker-js/faker";
import { UpsertUser } from "../../src/protocols";

export function generateUserData(): UpsertUser {
  return {
    frontId: faker.string.uuid(),
    money: faker.number.float({ min: 0, max: 10000 }),
    assets: [
      {
        name: faker.finance.currencyName(),
        price: faker.number.float({ min: 1, max: 100 }),
        amount: faker.number.int({ min: 1, max: 10 }),
        currentValue: faker.number.float({ min: 1, max: 100 }),
        acquisitionValue: faker.number.float({ min: 1, max: 100 }),
      }
    ]
  };
}
