import supertest from "supertest";
import { faker } from '@faker-js/faker';

import app from "../../src/app";
import { OrderInput } from "../../src/validator";
import httpStatus from "http-status";

const api = supertest(app);

describe("Pacients API Test", () => {
  it("should generate a successfull order", async () => {
    const orderInput: OrderInput = {
      client: faker.person.fullName(),
      description: faker.commerce.productDescription(),
    }

    const { status, body } = await api.post("/orders").send(orderInput);
    expect(status).toBe(httpStatus.CREATED);
    expect(body).toEqual({
      protocol: expect.any(String),
      status: "IN_PREPARATION"
    });
  });

  it("should not generate a order if data is missing", async () => {
    type WrongOrderInput = Omit<OrderInput, "client">; // misses
    const orderInput: WrongOrderInput = {
      description: faker.commerce.productDescription()
    }

    const { status } = await api.post("/orders").send(orderInput);
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

});