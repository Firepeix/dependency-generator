import Expense from "src/models/expense/core/Expense";
import Money from "src/helpers/Money";

export default class ExpenseService {
    constructor() {}

    /**
     * 
     * @param {Expense[]} expensesA 
     * @param {Expense[]} expensesB 
     * @returns {Money}
     */
    calculateTotalDiferrenceBetweenExpenses(expensesA, expensesB) {
        const totalA = expensesA.reduce((amount, expenseB) => amount + expenseB.amount.value, 0)
        const totalB = expensesB.reduce((amount, expenseB) => amount + expenseB.amount.value, 0)
        return new Money(totalA - totalB)
    }//657,04
}
let destinyToUserExpenses = [
    new Expense(1, "Ajuda Wendy", new Money(30000)),
    new Expense(2, "Presente Tati", new Money(4000)),
    new Expense(5, "Caixa", new Money(20214)),
    new Expense(6, "Entrada", new Money(53469)),
]