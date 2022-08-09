import User from "src/models/user/User";

export default class UserMapper {

    /**
     * 
     * @param {{
     *  "id": String,
     *  "name": String
     * }} raw
     * @returns {User}
     */
    toUser(raw) {
        return new User(raw.id, raw.name)
    }
}