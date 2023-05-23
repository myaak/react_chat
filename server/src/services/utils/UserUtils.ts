const pool = require('../../database/database')

export const userExists = async (email: string): Promise<boolean> => {
  const potentialLogin = await pool.query(
    "SELECT EMAIL FROM USERS WHERE EMAIL=$1",
    [email]
  );

  return potentialLogin.rowCount > 0
}

export const getUserIdByEmail = async (email: string): Promise<number> => {
  const userId = await pool.query(
    "SELECT ID FROM USERS WHERE EMAIL = $1",
    [email]
  ).rows[0].id;

  return userId;
}

export const ifUserExists = async (email: string): Promise<any> => {
  const user = await pool.query(
    "SELECT ID, EMAIL, PASSHASH FROM USERS WHERE EMAIL = $1",
    [email]
  )

  const existingUser = {
    id: user.rows[0].id,
    email: user.rows[0].email,
    password: user.rows[0].passhash
  }

  return existingUser
}

