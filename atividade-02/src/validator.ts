import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import joi from "joi";

export type PacientInput = {
  firstName: string,
  lastName: string,
  document: string,
  healthInsuranceId?: string
}

const pacientSchema = joi.object<PacientInput>({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  document: joi.string().required(),
  healthInsuranceId: joi.string().optional()
});

export function validate(req: Request, res: Response, next: NextFunction) {
  const validation = pacientSchema.validate(req.body);
  if (validation.error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ error: validation.error.message });
  }

  next();
}