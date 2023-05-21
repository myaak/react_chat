import UserErrors from "../UserErrors";
import { userExists } from './utils/UserUtils'
const tokenService = require('../services/token.service')
const bcrypt = require('bcrypt')
const pool = require('../database/database')

class UserService {
  async registration(email: string, password: string) {
    const candidate = await userExists(email); 

    if (candidate) {
      throw new UserErrors().existedUser();
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

      const tokens = tokenService.generateToken({...finalUser});

      await tokenService.saveToken(insertedUser.rows[0].id, tokens.refreshToken);

      return {
        ...tokens,
        user: finalUser
      }


    } catch (e){
      console.log(e)
    }
  }
}




module.exports = new UserService;
