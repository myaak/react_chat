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
      "UPDATE USERS_TOKEN SET REFRESH_TOKEN = $1 WHERE USER_ID = $2",
      [refreshToken, userId]
    )
  }
}

module.exports = new TokenService();
