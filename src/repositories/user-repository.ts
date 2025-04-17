import prisma from "../database";
import { UpsertUser } from "../protocols";

async function findByFrontId(frontId: string) {
  return prisma.user.findUnique({
    where: { frontId },
    select: {
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

async function updateUser(data: UpsertUser) {
    await prisma.asset.deleteMany({
        where: { userId: data.frontId }
    });
    
    return prisma.user.update({
        where: { frontId: data.frontId },
        data: {
            money: data.money,
            assets: {
                create: data.assets
            }
        }
    });
}

export const userRepository = {
    findByFrontId,
    createUser,
    updateUser
}