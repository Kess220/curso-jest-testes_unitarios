import express, { Request, Response, json } from "express";
import httpStatus from "http-status";
import { getInfractionsFrom } from "./infractions-service";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => res.send("ok!"));
app.get("/users/:licenseId/infractions", async (req: Request, res: Response) => {
  const licenseId = req.params.licenseId;
  try {
    const driverInfractions = await getInfractionsFrom(licenseId);
    return res.send(driverInfractions);
  } catch (error) {
    console.log(error);
    if (error.type === "NOT_FOUND") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
});

export default app;