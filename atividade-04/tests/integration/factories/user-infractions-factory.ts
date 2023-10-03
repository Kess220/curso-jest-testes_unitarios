import { faker } from "@faker-js/faker";
import prisma from "../../../src/database";
import { Level } from "@prisma/client";

export async function generateUserWithNInfractions(nInfractions = 1) {
  const user = await prisma.user.create({
    data: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      licenseId: faker.internet.ipv4().replace("/./g", "")
    }
  });

  for (let i = 0; i < nInfractions; i++) {
    await prisma.infraction.create({
      data: {
        userId: user.id,
        date: new Date(),
        cost: faker.number.int({ min: 100, max: 1000 }),
        level: getLevel(),
        description: faker.company.catchPhrase()
      }
    })
  }

  return user;
}

function getLevel(): Level {
  const levels = ["LIGHT", "MEDIUM", "SEVERE", "VERY_SEVERE"];
  const random = Math.floor(Math.random() * levels.length);
  return levels[random] as Level;
}