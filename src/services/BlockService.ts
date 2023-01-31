import { gql } from "graphql-request";
import * as log4js from "log4js"
import { gqlClient } from "../data-source"

export class BlockService {
    private log = log4js.getLogger("BlockService")

    async getBlocks(from: number, to: number): Promise<{ statusCode: number; message: any; }> {
        this.log.info(`Getting all blocks between ${from} and ${to}`)
        try {
            const result = await gqlClient.request(
                gql`query {
                    queryChain() {
                      blocksAggregate {
                        count
                      }
                      id
                      latestBlock:blocks(first: 1, order: {desc: number}) {
                        number
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