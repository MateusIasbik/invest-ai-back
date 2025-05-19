import { userService } from "../../src/services/user-service";
import { userRepository } from "../../src/repositories/user-repository";
import { UpsertUser } from "../../src/protocols";
import { faker } from "@faker-js/faker";

jest.mock("../../src/repositories/user-repository");

describe("userService.updateUser", () => {
  const mockUserData: UpsertUser = {
    frontId: faker.string.uuid(),
    money: 1000,
    assets: []
  };

  it("should create a new user if one doesn't exist", async () => {
    (userRepository.findByFrontId as jest.Mock).mockResolvedValue(null);
    (userRepository.createUser as jest.Mock).mockResolvedValue({});

    await userService.updateUser(mockUserData);

    expect(userRepository.createUser).toHaveBeenCalledWith(mockUserData);
  });

  it("should update user money when assets are empty", async () => {
    const mockUser = { id: "abc123", frontId: mockUserData.frontId };
    (userRepository.findByFrontId as jest.Mock).mockResolvedValue(mockUser);
    (userRepository.updateUserMoney as jest.Mock).mockResolvedValue({});

    await userService.updateUser(mockUserData);

    expect(userRepository.updateUserMoney).toHaveBeenCalledWith(mockUser.id, mockUserData.money);
  });
});
