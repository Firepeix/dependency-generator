export default class Dater {
    /**
     * 
     * @param {Date} date 
     */
    constructor(date) {
        this.date = date
    }

    /**
     * 
     * @param {String} string 
     */
    static parse(string) {
        const dates = string.split(" ")
        const date = dates[0].split("-")
        return new Dater(new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]), 0, 0, 0, 0))
    }


    /**
     * 
     * @returns {String}
     */
    display() {
        const day = this.date.getDate() >= 10 ? this.date.getDate() : `0${this.date.getDate()}`
        const month = this.date.getMonth() >= 10 ? this.date.getMonth() : `0${this.date.getMonth()}`
        return `${day}/${month}/${this.date.getFullYear()}`
    }
}