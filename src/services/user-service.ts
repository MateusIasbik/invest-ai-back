import { notFoundError } from "../errors/error";
import { UpsertUser } from "../protocols";
import { userRepository } from "../repositories/user-repository";


async function updateUser(UpsertUser: UpsertUser) {
    const user = await userRepository.findByFrontId(UpsertUser.frontId);
    if (!user) {
        await userRepository.createUser(UpsertUser);
    } else {
        await userRepository.updateUser(UpsertUser);
    }
}

async function findByFrontId(frontId: string) {
    const user = await userRepository.findByFrontId(frontId);
    if (!user) {
        throw notFoundError("ID do usuário")
    }
}

export const userService = {
    updateUser,
    findByFrontId
}