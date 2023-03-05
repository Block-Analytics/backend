import { Request, Response } from "express"
import * as log4js from "log4js"
import jwt_decode from "jwt-decode"
import { ControllerUtils, SCOPE_ADMIN } from "../utils/ControllerUtils"
import { BlockService } from "../services/BlockService"

export class BlockController {
  private log = log4js.getLogger("BlockController")
  private controllerUtils = new ControllerUtils()
  private queryService = new BlockService()

  async getLiveness(_request: Request, response: Response): Promise<void> {
    response.status(200).send("Pong")
  }

  async getLatestBlock(request: Request, response: Response): Promise<void> {
    const chain = request.params.chain
    const network = request.params.network
    const result = await this.queryService.getLatestBlock(chain, network)
    response.status(result.statusCode).send(result.message)
  }

  async getLatestBlocks(request: Request, response: Response): Promise<void> {
    const limit = request.params.limit ? parseInt(request.params.limit) : 100
    const chain = request.params.chain
    const network = request.params.network
    const result = await this.queryService.getLatestBlocks(chain, network, limit)
    response.status(result.statusCode).send(result.message)
  }
}