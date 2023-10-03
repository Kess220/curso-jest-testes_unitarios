import supertest from "supertest";
import httpStatus from "http-status";

import app from "../../src/app";
import prisma from "../../src/database";
import { generateUserWithNInfractions } from "./factories/user-infractions-factory";

const api = supertest(app);

beforeEach(async () => {
  await prisma.infraction.deleteMany();
  await prisma.user.deleteMany();
});

describe("Infractions API Test", () => {
  it("should get information about infractions of a driver", async () => {
    const user = await generateUserWithNInfractions(10);
    const { status, body } = await api.get(`/users/${user.licenseId}/infractions`);
    expect(status).toBe(httpStatus.OK);
    expect(body).toMatchObject({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      licenseId: user.licenseId
    });

    const { infractions } = body;
    expect(infractions).toHaveLength(10);
    expect(infractions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          date: expect.any(String),
          description: expect.any(String),
          cost: expect.any(Number),
          level: expect.any(String)
        })
      ])
    );
  });

  it("should get 404 when driver license does not exists", async () => {
    const { status, body } = await api.get(`/users/127001/infractions`);
    expect(status).toBe(httpStatus.NOT_FOUND);
  });

});