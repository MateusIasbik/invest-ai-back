import supertest from "supertest";
import app from "../../src/app";
import httpStatus from "http-status";
import { generateUserData } from "../factories/user-factory";
import prisma from "../../src/database";

const api = supertest(app);

beforeEach(async () => {
    await prisma.asset.deleteMany();
    await prisma.user.deleteMany();
});

describe("POST /", () => {
    it("should create a new user and return 200", async () => {
        const userData = generateUserData();

        const { status } = await api.post("/").send(userData);

        expect(status).toBe(httpStatus.OK);

        const user = await prisma.user.findUnique({
            where: { frontId: userData.frontId },
            include: { assets: true },
        });

        expect(user).not.toBeNull();
        expect(user!.money).toBeCloseTo(userData.money, 7);
        expect(user!.assets.length).toBe(userData.assets.length);
    });

    it("should update existing user money and assets", async () => {
        const userData = generateUserData();
        await api.post("/").send(userData);

        const updatedData = {
            ...userData,
            money: userData.money + 100,
            assets: userData.assets.map((asset) => ({
                ...asset,
                price: asset.price + 10,
                amount: asset.amount + 1,
            }))
        };

        const res = await api.post("/").send(updatedData);

        expect(res.status).toBe(httpStatus.OK);

        const user = await prisma.user.findUnique({
            where: { frontId: userData.frontId },
            include: { assets: true },
        });

        expect(user!.money).toBeCloseTo(updatedData.money, 7);
        expect(user!.assets[0].amount).toBe(updatedData.assets[0].amount);
    });

    it("Should only update money when not sending action", async () => {
        const userData = generateUserData();
        await api.post("/").send(userData);

        const userBefore = await prisma.user.findUnique({
            where: { frontId: userData.frontId },
            include: { assets: true },
        });
        
        const initialAssetCount = userBefore!.assets.length;
        
        const updatedData = {
            ...userData,
            money: userData.money + 100,
            assets: []
        };

        const res = await api.post("/").send(updatedData);

        expect(res.status).toBe(httpStatus.OK);

        const userAfter = await prisma.user.findUnique({
            where: { frontId: userData.frontId },
            include: { assets: true },
        });

        const finalAssetCount = userAfter!.assets.length;

        expect(finalAssetCount).toBe(initialAssetCount);
        expect(userAfter!.money).toBeCloseTo(updatedData.money, 7);
    });
});

describe("GET /:frontId", () => {
    it("should return user data if frontId exists", async () => {
        const userData = generateUserData();
        await api.post("/").send(userData);

        const res = await api.get(`/${userData.frontId}`);

        expect(res.status).toBe(httpStatus.OK);
        expect(res.body.frontId).toBe(userData.frontId);
        expect(res.body.money).toBeCloseTo(userData.money, 7);
        expect(res.body.assets).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    amount: expect.any(Number),
                    price: expect.any(Number),
                    acquisitionValue: expect.any(Number),
                    currentValue: expect.any(Number),
                }),
            ])
        );
    });


    it("should return 404 if frontId does not exist", async () => {
        const fakeFrontId = "non-existent-front-id";

        const res = await api.get(`/${fakeFrontId}`);

        expect(res.status).toBe(httpStatus.NOT_FOUND);
    });
});

