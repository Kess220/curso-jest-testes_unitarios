import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import joi from "joi";

export type OrderInput = {
  client: string,
  description: string
}

const orderSchema = joi.object<OrderInput>({
  client: joi.string().required(),
  description: joi.string().required()
});

export function validate(req: Request, res: Response, next: NextFunction) {
  const validation = orderSchema.validate(req.body);
  if (validation.error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ error: validation.error.message });
  }

  next();
}