import express, { Request, Response, json } from "express";
import httpStatus from "http-status";
import { v4 as uuidv4 } from 'uuid';

import { PacientInput, validate } from "./validator";
import { generateProtocolForPacient } from "./protocols-generator";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => res.send("ok!"));
app.post("/pacients", validate, (req: Request, res: Response) => {
  try {
    const { firstName, lastName, healthInsuranceId } = req.body as PacientInput;
    const hasPriority = healthInsuranceId ? true : false;
    const protocol = generateProtocolForPacient(firstName, lastName, hasPriority);
    res.status(httpStatus.CREATED).send(protocol)
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
});

export default app;