import express, { Request, Response, json } from "express";
import httpStatus from "http-status";

import calculator from "./calculator";
import { MathBody, validate } from "./validator";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => res.send("ok!"));
app.post("/math", validate, (req: Request, res: Response) => {
  try {
    const { operation, n1, n2 } = req.body as MathBody;
    let operations = {
      "sum": (n1: number, n2: number) => calculator.sum(n1, n2),
      "sub": (n1: number, n2: number) => calculator.sub(n1, n2),
      "mul": (n1: number, n2: number) => calculator.mul(n1, n2),
      "div": (n1: number, n2: number) => calculator.div(n1, n2),
    };

    const mathOperation = operations[operation];
    if (!mathOperation) return res.sendStatus(httpStatus.BAD_REQUEST);

    const result = mathOperation(n1, n2) as number;
    res.status(httpStatus.OK).send({ result });
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
});

export default app;