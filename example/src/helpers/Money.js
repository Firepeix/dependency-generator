import { Matcher, MatcherValue } from "./Matcher"

export default class Money {
    /**
     * 
     * @param {number} value 
     */
    constructor(value) {
        this.value = Money.format(value)
    }

    /**
     * @return {String}
     */
    get color() {
        return Matcher.when(this.field(), [
            new MatcherValue(MoneyField.Positive, "#21BA45"),
            new MatcherValue(MoneyField.Negative, "#C10015"),
            new MatcherValue(MoneyField.Zero, "#1976D2")
        ])
    }

    /**
     * 
     * @returns string
     */
    toReal(showSign = true) {
        if (this.value === 0) {
            return "R$ 0,00"
        }
        return `${showSign && this.value < 0 ? '-' : ''}R$ ${this.wholeNumber(showSign)},${String(this.value).slice(-2)}`
    }

    /**
     * @private
     * @returns string
     */
    wholeNumber() {
        let unit = []
        let formated = this.value > 0 ? String(this.value).slice(0, -2) : String(this.value).slice(1, -2)
        formated.split("").reverse().forEach((number, index) => {
            if(index % 3 === 0 && index !== 0) {
                unit.push(".")
            }
            unit.push(number)
        });
        return unit.reverse().join("")
    }

    /**
     * 
     * @returns {MoneyField}
     */
    field() {
        if(this.value > 0) {
            return MoneyField.Positive
        }

        if(this.value < 0) {
            return MoneyField.Negative
        }

        return MoneyField.Zero
    }

    /**
     * 
     * @param {String} amount 
     * @return {Number} 
     */
    static format(amount) {
       const sign = String(amount)[0] === "-" ? -1 : 1
       return Number(String(amount).replace(/\D/, "")) * sign
    }
}

/**
 * @enum {Number}
 */
const MoneyField = {
    Positive: 1,
    Negative: -1,
    Zero: 0
}

export {
    MoneyField
}