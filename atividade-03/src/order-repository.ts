import prisma from "./database";
import { OrderInput } from "./validator";

export function create(order: OrderInput) {
  return prisma.order.create({
    data: {
      client: order.client,
      description: order.description,
      protocol: new Date().getTime().toString(),
      status: "IN_PREPARATION",
    },
    select: {
      protocol: true,
      status: true,
    },
  });
}

export function getByProtocol(protocol: string) {
  return prisma.order.findUnique({
    where: {
      protocol,
    },
    select: {
      protocol: true,
      status: true,
    },
  });
}
