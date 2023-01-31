import { BlockController } from "./controller/BlockController"
import { TransactionController } from "./controller/TransactionController"

export const Routes = [
  {
    method: "get",
    route: "/blocks",
    controller: BlockController,
    action: "getBlocks",
  },
  {
    method: "get",
    route: "/transactions",
    controller: TransactionController,
    action: "getTransactions",
  }
];
