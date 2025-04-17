import { NextFunction, Request, Response } from "express";
import { UpsertUser } from "../protocols";
import { userService } from "../services/user-service";
import httpStatus from "http-status";

async function updateUser(req: Request, res: Response, next: NextFunction) {
    const data: UpsertUser = req.body;

    try {
        await userService.updateUser(data);
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }
}

async function findByFrontId(req: Request, res: Response, next: NextFunction) {
    const { frontId } = req.params;

    try {
        const userData = await userService.findByFrontId(frontId);
        return res.status(httpStatus.OK).send(userData);
    } catch (error) {
        next(error);
    }
}

export const userController = {
    updateUser,
    findByFrontId
}