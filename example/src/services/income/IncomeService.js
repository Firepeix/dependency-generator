import Income from "src/models/Income";
import IncomeRepository from "src/repositories/income/IncomeRepository";

export default class IncomeService {

    /**
     * 
     * @param {IncomeRepository} repository 
     */
    constructor(repository) {
        this.repository = repository
    }

    /**
     * 
     * @returns {Promise<Income[]>}
     */
    async getIncomes() {
        return await this.repository.getIncomeFromCurrentMonth()
    }

}
