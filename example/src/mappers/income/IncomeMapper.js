import PersonType from "src/common/enums/PersonType";
import Person from "src/models/common/Person"
import Dater from "src/helpers/Dater";
import Money from "src/helpers/Money";
import Income, { IncomeFrequency } from "src/models/Income";

export default class IncomeMapper {

    /**
     * 
     * @param {{
     * name: String,
     * "amount": Number,
     * "origin": {
     *   "id": String,
     *   "name": String,
     *   "type": PersonType
     * },
     * "date": Dater,
     * "frequency": IncomeFrequency
     * }} raw 
     * 
     * @returns {Income}
     */
    rawIncomeToIncome(raw) {
        return new Income({
            name: raw.name, 
            amount: new Money(raw.amount), 
            origin: new Person(raw.origin.id, raw.origin.name, raw.origin.type), 
            date: Dater.parse(raw.date), 
            frequency: raw.frequency
        })
    }
}