import UserRepository from "src/repositories/user/UserRepository";
import User from "src/models/user/User";
export default class UserService {
  /**
   *
   * @param {UserRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   *
   * @param {User} currentUser
   * @return {Promise<User[]>}
   */
  async getFriends() {
    return await this.repository.getFriends();
  }
}
