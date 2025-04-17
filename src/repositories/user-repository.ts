import prisma from "../database";
import { UpsertUser } from "../protocols";

async function findByFrontId(frontId: string) {
  return prisma.user.findUnique({
    where: { frontId },
    include: {
        assets: true
    }
  });
}

async function createUser(UpsertUser: UpsertUser) {

    return prisma.user.create({
        data: {
            frontId: UpsertUser.frontId,
            money: UpsertUser.money,
            assets: {
                create: UpsertUser.assets
            }
        }
    });
}

async function updateUser(UpsertUser: UpsertUser) {
    await prisma.asset.deleteMany({
        where: { userId: UpsertUser.frontId }
    });
    
    return prisma.user.update({
        where: { frontId: UpsertUser.frontId },
        data: {
            money: UpsertUser.money,
            assets: {
                create: UpsertUser.assets
            }
        }
    });
}

export const userRepository = {
    findByFrontId,
    createUser,
    updateUser
}