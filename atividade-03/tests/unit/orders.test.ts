import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";
import { create } from "./../../src/order-repository";
import { faker } from "@faker-js/faker";
import { Status } from "@prisma/client";
import { invalid } from "joi";

describe("Order Service Tests", () => {
  it("should create an order", async () => {
    const order = {
      client: "John Doe",
      description: "Test order",
    };

    // Crie um spy para a função create do orderRepository
    const createSpy = jest.spyOn(orderRepository, "create").mockResolvedValue({
      protocol: "mock-protocol",
      status: "IN_PREPARATION",
    });

    // Chame a função createOrder para criar o pedido
    const createdOrder = await createOrder(order);

    // Verifique se o spy foi chamado com os argumentos corretos
    expect(createSpy).toHaveBeenCalledWith({
      client: order.client,
      description: order.description,
    });

    // Verifique se o resultado é o que você espera
    expect(createdOrder.protocol).toBe("mock-protocol");
    expect(createdOrder.status).toBe("IN_PREPARATION");

    // Restaure o spy após o teste
    createSpy.mockRestore();
  });

  it("should return an order based on the protocol", async () => {
    const fakeOrder = {
      protocol: "fake-protocol",
      status: Status.READY,
    };

    // Crie um spy para a função getByProtocol do orderRepository
    const getByProtocolSpy = jest
      .spyOn(orderRepository, "getByProtocol")
      .mockResolvedValue(fakeOrder);

    // Chame a função getOrderByProtocol para obter um pedido com base no protocolo
    const protocolToSearch = "fake-protocol";
    const foundOrder = await getOrderByProtocol(protocolToSearch);

    // Verifique se o spy foi chamado com o protocolo correto
    expect(getByProtocolSpy).toHaveBeenCalledWith(protocolToSearch);

    // Verifique se o resultado é o que você espera
    expect(foundOrder).toEqual(fakeOrder);

    // Restaure o spy após o teste
    getByProtocolSpy.mockRestore();
  });

  it("should return status INVALID when protocol doesn't exist", async () => {
    const fakeOrder = {
      protocol: "non-existent-protocol",
      status: Status.CANCELLED,
    };

    // Crie um spy para a função getByProtocol do orderRepository
    const getByProtocolSpy = jest
      .spyOn(orderRepository, "getByProtocol")
      .mockResolvedValue(fakeOrder);

    // Chame a função getOrderByProtocol para obter um pedido com base no protocolo
    const protocolToSearch = "non-existent-protocol";
    const foundOrder = await getOrderByProtocol(protocolToSearch);

    // Verifique se o spy foi chamado com o protocolo correto
    expect(getByProtocolSpy).toHaveBeenCalledWith(protocolToSearch);

    // Verifique se o resultado é nulo, indicando que o pedido não foi encontrado
    expect(foundOrder.status).toBe("CANCELLED");

    // Restaure o spy após o teste
    getByProtocolSpy.mockRestore();
  });
});
