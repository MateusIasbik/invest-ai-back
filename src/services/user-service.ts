import { notFoundError } from "../errors/error";
import { UpsertUser } from "../protocols";
import { userRepository } from "../repositories/user-repository";


async function updateUser(data: UpsertUser) {
    const user = await userRepository.findByFrontId(data.frontId);
    if (!user) {
        await userRepository.createUser(data);
    } else {
        await userRepository.updateUser(data);
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