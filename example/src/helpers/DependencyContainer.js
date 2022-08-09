import ExpenseService from "src/services/expense/ExpenseService"
import IncomeService from "src/services/income/IncomeService"
import IncomeRepository from "src/repositories/income/IncomeRepository"
import IncomeMapper from "src/mappers/income/IncomeMapper"
import PurchaseRepository from "src/repositories/puchase/PurchaseRepository"
import PurchaseMapper from "src/mappers/purchase/PurchaseMapper"
import PurchaseService from "src/services/purchase/PurchaseService"
import UserService from "src/services/user/UserService"
import UserRepository from "src/repositories/user/UserRepository"
import UserMapper from "src/mappers/user/UserMapper"
import { ebisuClient } from "boot/axios"

const incomeRepository = new IncomeRepository(new IncomeMapper(), ebisuClient)
const purchaseRepository = new PurchaseRepository(new PurchaseMapper(), ebisuClient)
const userRepository    = new UserRepository(new UserMapper(), ebisuClient)

const expenseService = new ExpenseService()
const incomeService  = new IncomeService(incomeRepository)
const purchaseService = new PurchaseService(purchaseRepository)
const userService = new UserService(userRepository)


export {
    expenseService,
    incomeService,
    purchaseService,
    userService
}