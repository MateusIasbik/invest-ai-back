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

async function createUserWithData(UpsertUser: UpsertUser) {

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

