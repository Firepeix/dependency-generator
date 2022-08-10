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


const usermapper = new UserMapper()
const purchasemapper = new PurchaseMapper()
const incomemapper = new IncomeMapper()
const expenseservice = new ExpenseService()
const purchaserepository = new PurchaseRepository(purchasemapper,ebisuClient)
const userrepository = new UserRepository(usermapper,ebisuClient)
const incomerepository = new IncomeRepository(incomemapper,ebisuClient)
const userservice = new UserService(userrepository)
const purchaseservice = new PurchaseService(purchaserepository)
const incomeservice = new IncomeService(incomerepository)
