import PurchaseMapper from 'src/mappers/purchase/PurchaseMapper.js'
import UserMapper from 'src/mappers/user/UserMapper.js'
import IncomeRepository from 'src/repositories/income/IncomeRepository.js'
import PurchaseRepository from 'src/repositories/puchase/PurchaseRepository.js'
import IncomeMapper from 'src/mappers/income/IncomeMapper.js'
import UserRepository from 'src/repositories/user/UserRepository.js'
import ExpenseService from 'src/services/expense/ExpenseService.js'
import IncomeService from 'src/services/income/IncomeService.js'
import UserService from 'src/services/user/UserService.js'
import PurchaseService from 'src/services/purchase/PurchaseService.js'
import { ebisuClient } from 'boot/axios'

/** ARQUIVO GERADO COM MAGIA NEGRA POR FAVOR NAO ALTERAR  */

const purchasemapper = new PurchaseMapper()
const usermapper = new UserMapper()
const incomemapper = new IncomeMapper()
const expenseservice = new ExpenseService()
const incomerepository = new IncomeRepository(incomemapper,ebisuClient)
const purchaserepository = new PurchaseRepository(purchasemapper,ebisuClient)
const userrepository = new UserRepository(usermapper,ebisuClient)
const incomeservice = new IncomeService(incomerepository)
const userservice = new UserService(userrepository)
const purchaseservice = new PurchaseService(purchaserepository)

export { purchasemapper,usermapper,incomemapper,expenseservice,incomerepository,purchaserepository,userrepository,incomeservice,userservice,purchaseservice }