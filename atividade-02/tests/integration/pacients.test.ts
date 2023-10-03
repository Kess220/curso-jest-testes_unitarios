import supertest from "supertest";
import { faker } from '@faker-js/faker';

import app from "../../src/app";
import { PacientInput } from "../../src/validator";
import httpStatus from "http-status";

const api = supertest(app);

describe("Pacients API Test", () => {
  it("should generate a successfull protocol for a pacient", async () => {
    const pacientData: PacientInput = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      document: faker.finance.accountNumber(),
    }

    const { status, body } = await api.post("/pacients").send(pacientData);
    expect(status).toBe(httpStatus.CREATED);
    expect(body).toEqual({
      priority: false,
      date: expect.any(String),
      pacient: `${pacientData.firstName} ${pacientData.lastName}`,
      protocol: expect.any(String)
    });
  });

  it("should not generate a protocol if data is missing", async () => {
    const pacientData = { // document is missing
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    };

    const { status } = await api.post("/pacients").send(pacientData);
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  })

});