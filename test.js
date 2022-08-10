import UserMapper from 'example/src/mappers/user/UserMapper.js'
import PurchaseMapper from 'example/src/mappers/purchase/PurchaseMapper.js'
import IncomeMapper from 'example/src/mappers/income/IncomeMapper.js'
import PurchaseRepository from 'example/src/repositories/puchase/PurchaseRepository.js'
import UserRepository from 'example/src/repositories/user/UserRepository.js'
import IncomeRepository from 'example/src/repositories/income/IncomeRepository.js'
import UserService from 'example/src/services/user/UserService.js'
import ExpenseService from 'example/src/services/expense/ExpenseService.js'
import PurchaseService from 'example/src/services/purchase/PurchaseService.js'
import IncomeService from 'example/src/services/income/IncomeService.js'
import { ebisuClient } from 'boot/axios'


const userMapper = new UserMapper()
const purchaseMapper = new PurchaseMapper()
const incomeMapper = new IncomeMapper()
const expenseService = new ExpenseService()
const purchaseRepository = new PurchaseRepository(purchaseMapper,ebisuClient)
const userRepository = new UserRepository(userMapper,ebisuClient)
const incomeRepository = new IncomeRepository(incomeMapper,ebisuClient)
const userService = new UserService(userRepository)
const purchaseService = new PurchaseService(purchaseRepository)
const incomeService = new IncomeService(incomeRepository)

export { userMapper,
purchaseMapper,
incomeMapper,
purchaseRepository,
userRepository,
incomeRepository,
userService,
expenseService,
purchaseService,
incomeService 
}