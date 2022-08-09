import Income from "src/models/Income";
import { AxiosInstance } from "axios";
import IncomeMapper from "src/mappers/income/IncomeMapper";

export default class IncomeRepository {
    /**
     * 
     * @param {IncomeMapper} mapper 
     * @param {AxiosInstance} client 
     */
    constructor(mapper, client) {
        this.mapper = mapper
        this.client = client
    }

    /**
     * 
     * @returns {Promise<Income[]>}
     */
    async getIncomeFromCurrentMonth() {
        const request = await this.client.get("/incomes")
        return request.data.data.map(rawIncome => this.mapper.rawIncomeToIncome(rawIncome))
    }

}
