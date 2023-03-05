import * as log4js from "log4js"
import { surrealClient } from "../data-source"

export class BlockService {
  private log = log4js.getLogger("BlockService")

  async getLatestBlock(chain: string, network: string, limit: number = 100): Promise<{ statusCode: number; message: any; }> {
    this.log.info(`Getting lastest block`)
    try {
      const res = (await (await surrealClient()).query(`SELECT * FROM block WHERE chain="chain:${chain}_${network}" ORDER BY mined_at DESC LIMIT 1;`))[0].result[0]
      return {
        statusCode: 200,
        message: res,
      }
    } catch (error) {
      this.log.error("Error getting blocks: " + error)
      return {
        statusCode: 500,
        message: error,
      }
    }
  }

  async getLatestBlocks(chain: string, network: string, limit: number = 100): Promise<{ statusCode: number; message: any; }> {
    this.log.info(`Getting lastest ${limit} blocks, from ${chain}:${network}`)
    try {
      const res = (await (await surrealClient()).query(`SELECT * FROM block WHERE chain="chain:${chain}_${network}" ORDER BY mined_at DESC LIMIT ${limit};`))[0].result
      return {
        statusCode: 200,
        message: res,
      }
    } catch (error) {
      this.log.error(error)
      return {
        statusCode: 500,
        message: error,
      }
    }
  }
}