import { Request, Response } from "express"
import * as log4js from "log4js"
import jwt_decode from "jwt-decode"
import { ControllerUtils, SCOPE_ADMIN } from "../utils/ControllerUtils"
import { TransactionService } from "../services/transactionService"

export class TransactionController {
  private log = log4js.getLogger("TransactionController")
  private controllerUtils = new ControllerUtils()
  private transactionService = new TransactionService()

  async getTransactionsByMonths(request: Request, response: Response): Promise<void> {
    const chain = request.params.chain
    const network = request.params.network
    const result = await this.transactionService.getTransactionsByMonths(chain, network)
    response.status(result.statusCode).send(result.message)
  }

  async getTotalTransactions(request: Request, response: Response): Promise<void> {
    const chain = request.params.chain
    const network = request.params.network
    const result = await this.transactionService.getTotalTransactions(chain, network)
    response.status(result.statusCode).send(result.message)
  }
  
  async getTransactionsFromLatestBlock(request: Request, response: Response): Promise<void> {
    const chain = request.params.chain
    const network = request.params.network
    const result = await this.transactionService.getTransactionsFromLatestBlock(chain, network)
    response.status(result.statusCode).send(result.message)
  }

  async getTransactionsFromBlock(request: Request, response: Response): Promise<void> {
    const block = request.params.block
    const chain = request.params.chain
    const network = request.params.network
    if (!block) {
      response.status(400).send("Missing block parameter")
      return
    }
    const result = await this.transactionService.getTransactionsFromBlock(chain, network, block)
    response.status(result.statusCode).send(result.message)
  }
}