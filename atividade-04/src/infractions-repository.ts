import prisma from "./database";

export function getInfractionsFrom(userId: number) {
  return prisma.infraction.findMany({
    where: {
      userId,
    },
  });
}
