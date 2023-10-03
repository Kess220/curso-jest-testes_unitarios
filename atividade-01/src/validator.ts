import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import joi from "joi";

export type MathBody = {
  operation: string;
  n1: number;
  n2: number;
};

const mathSchema = joi.object<MathBody>({
  operation: joi.string().length(3).required(),
  n1: joi.number().required(),
  n2: joi.number().required(),
});

export function validate(req: Request, res: Response, next: NextFunction) {
  const validation = mathSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .send({ error: validation.error.message });
  }

  next();
}
