import UserErrors from "../exceptions/user.errors";
import { ifUserExists, userExists } from './utils/UserUtils'
const tokenService = require('../services/token.service')
const bcrypt = require('bcrypt')
const pool = require('../database/database')
const ApiError = require('../exceptions/api.error')

class UserService {
  async registration(email: string, password: string) {
    const candidate = await userExists(email);

    if (candidate) {
      throw ApiError.BadRequest(new UserErrors().existedUser());
    }

    try {
      const hasshedPassword = await bcrypt.hash(password, 3);
      const newUser = {
        email: email,
        password: hasshedPassword,
      }

      const temp = await pool.query(
        "INSERT INTO USERS(email, passhash) VALUES($1, $2)",
        [newUser.email, newUser.password]
      );

      const insertedUser = await pool.query(
        "SELECT ID, EMAIL FROM USERS WHERE EMAIL = $1",
        [newUser.email]
      );

      const finalUser = {
        id: insertedUser.rows[0].id,
        email: insertedUser.rows[0].email
      }

      const tokens = tokenService.generateToken(finalUser);

      await tokenService.saveToken(insertedUser.rows[0].id, tokens.refreshToken);

      return {
        ...tokens,
        user: finalUser
      }


    } catch (e) {
      console.log(e)
    }
  }

  async login(email: string, password: string) {
    if (!userExists) {
      throw ApiError.BadRequest(new UserErrors().notExistedUser());
    }

    const user = await ifUserExists(email);

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      throw ApiError.BadRequest(new UserErrors().wrongEmailOrPassword());
    }

    const finalUser = {
      id: user.id,
      email: user.email
    }

    const tokens = tokenService.generateToken(finalUser);

    await tokenService.saveToken(finalUser.id, tokens.refreshToken);

    return {
      ...tokens,
      user: finalUser
    }
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }
}




module.exports = new UserService;
