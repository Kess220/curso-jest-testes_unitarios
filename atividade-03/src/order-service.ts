import { v4 as uuidv4 } from 'uuid';
import { OrderInput } from './validator';
import { create, getByProtocol } from './order-repository';

export async function createOrder(order: OrderInput) {
  return await create(order);
}

export async function getOrderByProtocol(protocol: string) {
  const order = await getByProtocol(protocol);
  if (!order) return {
    protocol,
    status: "INVALID"
  }

  return order;
}