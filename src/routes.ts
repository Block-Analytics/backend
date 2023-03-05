import { BlockController } from "./controller/BlockController"
import { TransactionController } from "./controller/TransactionController"

export const Routes = [
  {
    method: "get",
    route: "/:chain/:network/transactions/monthly",
    controller: TransactionController,
    action: "getTransactionsByMonths",
  },
  {
    method: "get",
    route: "/:chain/:network/transactions/total",
    controller: TransactionController,
    action: "getTotalTransactions",
  },
  {
    method: "get",
    route: "/:chain/:network/transactions/block/:block",
    controller: TransactionController,
    action: "getTransactionsFromBlock",
  }
];
