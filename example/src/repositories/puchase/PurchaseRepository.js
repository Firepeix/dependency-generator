import PurchaseMapper from "src/mappers/purchase/PurchaseMapper";
import DebitSummary from "src/models/expense/summary/DebitSummary";
import CreditSummary from "src/models/purchase/card/CreditSummary";
import { AxiosInstance } from "axios";

export default class PurchaseRepository {
    /**
     * 
     * @param {PurchaseMapper} mapper 
     * @param {AxiosInstance} client 
     */
     constructor(mapper, client) {
        this.mapper = mapper
        this.client = client
    }

    /**
     * 
     * @returns {Promise<CreditSummary[]>}
     */
    async getCreditSummaryForCurrentMonth() {
        const request = await this.client.get("/purchases/credit/summary")
        return request.data.data.map(rawSummary => this.mapper.toCreditSummary(rawSummary))
    }

    /**
     * 
     * @returns {Promise<DebitSummary>}
     */
     async getDebitSummaryForCurrentMonth() {
        const request = await this.client.get("/purchases/debit/summary")
        return this.mapper.toDebitSummary(request.data.data.summary)
    }

}
