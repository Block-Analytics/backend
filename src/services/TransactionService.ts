import * as log4js from "log4js"
import { surrealClient } from "../data-source"
import { BlockService } from "./BlockService";

export class TransactionService {
  private log = log4js.getLogger("TransactionService")
  private blockService = new BlockService()

  async getTransactionsByMonths(chain: string, network: string): Promise<{ statusCode: number; message: any; }> {
    this.log.info(`Getting transactions by months for the last year`)
    try {
      const res = (await (await surrealClient()).query(`
        SELECT mined_at, 
        string::concat(time::year(mined_at),'-', time::month(mined_at)) as date, 
        time::year(mined_at) as year, time::month(mined_at) as month, 
        math::sum(count(->has.out)) as txs 
        FROM block WHERE chain="chain:${chain}_${network}" AND mined_at > time::now()-1y GROUP BY month;
      `))[0].result

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

  async getTotalTransactions(chain: string, network: string): Promise<{ statusCode: number; message: any; }> {
    this.log.info(`Getting total transactions`)
    try {
      const res = (await (await surrealClient()).query(`SELECT math::sum(count(->has.out.*)) as txs WHERE chain="chain:${chain}_${network}" FROM block GROUP BY txs;`))[0].result[0].txs

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

  async getTransactionsFromLatestBlock(chain: string, network: string): Promise<{ statusCode: number; message: any; }> {
    this.log.info(`Getting txs from latest block`)
    try {
      const latestBlock = await this.blockService.getLatestBlock(chain, network)
      const res = (await (await surrealClient()).query(`SELECT ->has.out.* as txs FROM block WHERE id="block:${latestBlock.message.id}" AND chain="chain:${chain}_${network}";`))[0].result[0].txs

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

  async getTransactionsFromBlock(chain: string, network: string, block: string): Promise<{ statusCode: number; message: any; }> {
    this.log.info(`Getting tx from block ${block}, from ${chain}:${network}`)
    try {
      const res = (await (await surrealClient()).query(`SELECT ->has.out.* as txs FROM block WHERE id="block:${block}" AND chain="chain:${chain}_${network}";`))[0].result[0].txs
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