const jwt = require('jsonwebtoken');
//@ts-ignore
const pool = require('../database/database')
require("dotenv").config();

class TokenService {
  generateToken(payload: any) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId: number, refreshToken: any) {
    await pool.query(
      "INSERT INTO USERS_TOKEN (USER_ID, REFRESH_TOKEN) VALUES($1, $2)",
      [userId, refreshToken]
    )
  }

  async removeToken(refreshToken: any) {
    await pool.query(
      "DELETE FROM USERS_TOKEN WHERE REFRESH_TOKEN = $1",
      [refreshToken]
    )
  }
}

module.exports = new TokenService();
