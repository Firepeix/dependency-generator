import UserMapper from "src/mappers/user/UserMapper"
import User from "src/models/user/User"
import { AxiosInstance } from "axios";

export default class UserRepository {

    /**
     * 
     * @param {UserMapper} mapper 
     * @param {AxiosInstance} client 
     */
    constructor(mapper, client) {
        this.mapper = mapper
        this.client = client
    }


    /**
     * 
     * @param {User} currentUser 
     * @return {Promise<User[]>}
     */
    async getFriends() {
        const request = await this.client.get("/users/friends")
        return request.data.data.map(raw => this.mapper.toUser(raw))
    }
}