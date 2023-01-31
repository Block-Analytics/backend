import * as log4js from "log4js"
import { gqlClient } from "../data-source"

export class TransactionService {
  private log = log4js.getLogger("TransactionService")

  async getTransactionsByMonths(from: number, to: number): Promise<{ statusCode: number; message: any; }> {
    this.log.info(`Getting all transactions for ${from} to ${to}`)
    try {
      var date = new Date();
      var startOfMonthTimestamp = Math.floor(new Date(date.getFullYear(), date.getMonth(), 1).getTime() / 1000);
      var endOfMonthTimestamp = Math.floor(new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime() / 1000);

      let string = ''
      for (let index = 0; index < 12; index++) {
        string = string+`
            month${index.toString()}: 
            blocks(
              filter: {timestamp: {between: {min: "${startOfMonthTimestamp}", max: "${endOfMonthTimestamp}"}}}
              ) {
              timestamp
              number
              txsAggregate {
                count
              }
            }
          `
        startOfMonthTimestamp = Math.floor(new Date(date.getFullYear(), date.getMonth() - index, 1).getTime() / 1000);
        endOfMonthTimestamp = Math.floor(new Date(date.getFullYear(), date.getMonth() - index + 1, 0).getTime() / 1000);     
      }
      console.log(string);
      
      const result = await gqlClient.request(
        `query {
          queryChain {
            blockchain
            id
            ${string}
          }
        }`)
        return {
          statusCode: 200,
          message: result,
        }
    } catch (error) {
      this.log.error("Error getting blocks: " + error)
      return {
        statusCode: 500,
        message: error,
      }
    }
  }

  async getTransactions(from: number, to: number): Promise<{ statusCode: number; message: any; }> {
    this.log.info(`Getting all transactions for ${from} to ${to}`)
    try {
      const result = await gqlClient.request(
        `query {
          queryChain() {
            txsAggregate {
              count
            }
            id
            latestTx:blocks(first: 1, order: {desc: number}) {
              txs {
                from {
                  id
                }
                to {
                  id
                }
                hash
              }
            }
          }
        }`
      )
      return {
        statusCode: 200,
        message: result,
      }
    } catch (error) {
      this.log.error("Error getting blocks: " + error)
      return {
        statusCode: 500,
        message: error,
      }
    }
  }
}