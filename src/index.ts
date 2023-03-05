import express from "express";
import { Routes } from "./routes";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as log4js from "log4js";
import config from "config";

const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

const expresslogger = log4js.getLogger(`backend HTTP`)
const logger = log4js.getLogger(`server`)

expresslogger.level = config.get("log.level")
logger.level = config.get("log.level")

app.use(log4js.connectLogger(expresslogger, { level: 'auto' }))

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

app.listen(config.get("server.port"), () => {
  logger.info(`Backend service is listening on port ${config.get("server.port")}`);
});