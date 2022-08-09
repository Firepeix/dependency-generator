import DebitSummary from "src/models/expense/summary/DebitSummary"
import CreditSummary from "src/models/purchase/card/CreditSummary"
import PurchaseRepository from "src/repositories/puchase/PurchaseRepository"

export default class PurchaseService {

    /**
     * 
     * @param {PurchaseRepository} repository 
     */
    constructor(repository) {
        this.repository = repository
    }

    /**
     * 
     * @returns {Promise<CreditSummary[]>}
     */
    async getCreditSummary() {
        return await this.repository.getCreditSummaryForCurrentMonth()
    }

    /**
     * 
     * @returns {Promise<DebitSummary>}
     */
    async getDebitSummary() {
        return await this.repository.getDebitSummaryForCurrentMonth()
    }

}
