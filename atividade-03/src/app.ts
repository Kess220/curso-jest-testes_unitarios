import express, { Request, Response, json } from "express";
import httpStatus from "http-status";

import { OrderInput, validate } from "./validator";
import { createOrder } from "./order-service";
import { getByProtocol } from "./order-repository";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => res.send("ok!"));

app.post("/orders", validate, async (req: Request, res: Response) => {
  const order = req.body as OrderInput;
  try {
    const orderProtocol = await createOrder(order);
    res.status(httpStatus.CREATED).send(orderProtocol);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
});

app.get("/order/:protocol", (req: Request, res: Response) => {
  const protocol = req.params.protocol;
  if (!protocol) return res.send(httpStatus.BAD_REQUEST);
  try {
    const order = getByProtocol(protocol);
    res.send(protocol);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
});

export default app;