import * as express from "express";
import { Routes } from "./routes";
import { Request, Response, NextFunction } from "express";
import * as cors from "cors";

const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

Routes.forEach(route => {
  (app as any)[route.method](route.route, (req: Request, res: Response, next: NextFunction) => {
    const result = (new (route.controller as any))[route.action](req, res, next);
    if (result instanceof Promise) {
      result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
    } else if (result !== null && result !== undefined) {
      res.json(result);
    }
  });
});

app.listen(3000, () => {
  console.log('Backend service is listening on port 3000');
});