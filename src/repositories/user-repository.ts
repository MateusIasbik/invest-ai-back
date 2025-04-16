import prisma from "../database";
import { UpsertUser } from "../protocols";

async function findByFrontId(frontId: string) {
  return prisma.user.findUnique({
    where: { frontId },
    include: {
        assets: true,
        wallet: true
    }
  });
}

async function createUserWithData(UpsertUser: UpsertUser) {
    const { frontId, money, assets } = UpsertUser;

    return prisma.user.create({
        data: {
            frontId: UpsertUser.frontId,
            assets: {
                create: UpsertUser.assets
            },
            wallet: {
                create: {
                    balance: UpsertUser.money
                }
            }
        }
    });
}