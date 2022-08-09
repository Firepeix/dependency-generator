import Money from "src/helpers/Money";
import Card from "src/models/card/Card";
import DebitSummary from "src/models/expense/summary/DebitSummary";
import CreditSummary from "src/models/purchase/card/CreditSummary";

export default class PurchaseMapper {

    /**
     * 
     * @param {{
     * card: {
     *  name: String,
     *  color: String
     * },
     * spent: Number,
     * planned: Number,
     * difference: Number
     * }} raw
     * @returns {CreditSummary}
     */
    toCreditSummary(raw) {
        return new CreditSummary({
            card: new Card(raw.card.name, raw.card.color),
            spent: new Money(raw.spent),
            planned: new Money(raw.planned),
            difference: new Money(raw.difference)
        })
    }

    /**
     * 
     * @param {{
     *       "currentNetAmount": Number,
     *       "amountToPay": Number,
     *       "payedAmount": Number,
     *       "totalAmount": Number,
     *       "forecastAmount": Number,
     *       "currentAmount": Number
     *   }} raw
         * @returns {DebitSummary}
         */
        toDebitSummary(raw) {
            return new DebitSummary({
                currentNetAmount: new Money(raw.currentNetAmount),
                amountToPay: new Money(raw.amountToPay),
                payedAmount: new Money(raw.payedAmount),
                totalAmount: new Money(raw.totalAmount),
                forecastAmount: new Money(raw.forecastAmount),
                currentAmount: new Money(raw.currentAmount),
            })
        }
}