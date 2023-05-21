const pool = require('../../database/database')

export const userExists = async (email: string): Promise<boolean> => {
  const potentialLogin = await pool.query(
    "SELECT EMAIL FROM USERS WHERE EMAIL=$1",
    [email]
  );

  return potentialLogin.rowCount > 0
}

export const getUserIdByEmail = async(email:string): Promise<number> => {
  const userId = await pool.query(
    "SELECT ID FROM USERS WHERE EMAIL = $1",
    [email]
  ).rows[0].id;

  return userId;
}

