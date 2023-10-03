import * as infractionsRepository from './infractions-repository';
import * as usersRepository from "./users-repository";

export async function getInfractionsFrom(licenseId: string) {
  const user = await usersRepository.getUserByDocument(licenseId);
  if (!user) throw { type: "NOT_FOUND", message: "Driver not found." }

  const infractions = await infractionsRepository.getInfractionsFrom(user.id);
  return {
    ...user,
    infractions
  }
}