import prisma from "../database";
import { AssetsDataWithoutId, UpsertUser } from "../protocols";

async function findByFrontId(frontId: string) {
  return prisma.user.findUnique({
    where: { frontId },
    select: {
      id: true,
      frontId: true,
      money: true,
      assets: true
    }
  });
}

async function createUser(data: UpsertUser) {
  return prisma.user.create({
    data: {
      frontId: data.frontId,
      money: data.money,
      assets: {
        create: data.assets
      }
    }
  });
}

async function updateUserMoney(userId: string, money: number) {
  return prisma.user.update({
    where: { id: userId },
    data: { money }
  });
}

async function findUserAssetByName(userId: string, name: string) {
  return prisma.asset.findUnique({
    where: {
      userId_name: {
        userId,
        name
      }
    }
  });
}

async function createAsset(userId: string, asset: AssetsDataWithoutId) {
  return prisma.asset.create({
    data: {
      ...asset,
      userId
    }
  });
}

async function updateAsset(userId: string, asset: AssetsDataWithoutId) {
  return prisma.asset.update({
    where: {
      userId_name: {
        userId,
        name: asset.name
      }
    },
    data: {
      price: asset.price,
      amount: asset.amount,
      currentValue: asset.currentValue,
      acquisitionValue: asset.acquisitionValue
    }
  });
}

async function deleteAsset(userId: string, assetName: string) {
  return prisma.asset.deleteMany({
    where: {
      userId,
      name: assetName
    }
  });
}


export const userRepository = {
  findByFrontId,
  createUser,
  updateUserMoney,
  findUserAssetByName,
  createAsset,
  updateAsset,
  deleteAsset
};
