import * as usersRepository from "../../src/users-repository";
import { getInfractionsFrom } from "../../src/infractions-service";
import { User } from "@prisma/client";

describe("Infractions Service Tests", () => {
  it("should get infractions from user", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      licenseId: "111.111.11.11",
    };

    jest
      .spyOn(usersRepository, "getUserByDocument")
      .mockImplementationOnce((): any => {
        return userData;
      });

    const infractions = await getInfractionsFrom("111.111.11.11");

    expect(infractions).toEqual({
      firstName: "John",
      lastName: "Doe",
      licenseId: "111.111.11.11",
      infractions: [],
    });
  });
});

it("should throw an error when driver license does not exist", async () => {
  // Mock da função getUserByDocument para retornar nulo (usuário não encontrado)
  jest.spyOn(usersRepository, "getUserByDocument").mockResolvedValue(null);

  // Chamada à função que deve lançar um erro
  try {
    await getInfractionsFrom("1");
  } catch (error) {
    expect(error.type).toBe("NOT_FOUND");
    expect(error.message).toBe("Driver not found.");
  }
});
