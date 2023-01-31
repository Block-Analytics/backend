import { Request, Response } from "express"
import { gqlClient } from "../data-source"
import * as log4js from "log4js"
import jwt_decode from "jwt-decode"
import { ControllerUtils, SCOPE_ADMIN } from "../utils/ControllerUtils"
import { TransactionService } from "../services/transactionService"

export class TransactionController {
  private log = log4js.getLogger("QueryController")
  private controllerUtils = new ControllerUtils()
  private transactionService = new TransactionService()

  async getLiveness(_request: Request, response: Response): Promise<void> {
    if (gqlClient) {
      response.status(200).send("Pong")
      return
    }
    response.status(500).send({
      err: "Couldn't perform a query on the DB - check the connection",
    })
  }

  async getTransactions(request: Request, response: Response): Promise<void> {
    const from = request.body?.from ?? Math.floor(new Date().getTime() / 1000)-86400
    const to = request.body?.to ?? Math.floor(new Date().getTime() / 1000)
    const result = await this.transactionService.getTransactions(from, to)
    response.status(result.statusCode).send(result.message)
  }

  async getTransactionsByMonths(request: Request, response: Response): Promise<void> {
    const from = request.body?.from ?? Math.floor(new Date().getTime() / 1000)-86400
    const to = request.body?.to ?? Math.floor(new Date().getTime() / 1000)
    const result = await this.transactionService.getTransactionsByMonths(from, to)
    response.status(result.statusCode).send(result.message)
  }
}