import { Request, Response } from 'express';
import UserErrors from '../UserErrors';
const pool = require('../database/database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const registerUser = (async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const potentialLogin = await pool.query(
    "SELECT EMAIL FROM USERS WHERE EMAIL=$1",
    [email]
  );

  if (potentialLogin.rowCount > 0) {
    res.status(200).send(new UserErrors().existedUser());
  }

  try {
    const salt = bcrypt.genSalt();
    const hasshedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      email: email,
      password: hasshedPassword,
      token: ''
    }

    await pool.query(
      "INSERT INTO USERS(email, passhash, token) VALUES($1, $2, $3)",
      [newUser.email, newUser.password, newUser.token]
    )

    const user = {
      username: newUser.email,
      role: "USER"
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.json({ accessToken: accessToken })


  } catch {
    res.status(500).send()
  }
})

const authenticateUser = (async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const potentialLogin = await pool.query(
    "SELECT EMAIL FROM USERES WHERE EMAIL=$1",
    [email]
  );

  if (potentialLogin.rowCount === 0) {
    res.status(200).send(new UserErrors().notExistedUser());
  }

  try {
    const user = {
      email: potentialLogin.rows[0].email,
      password: potentialLogin.rows[0].passhash
    }

    if (await bcrypt.compare(password, user.password)) {
      
    } else {
      res.status(200).send(new UserErrors().wrongEmailOrPassword());
    }

  } catch {
    res.status(500).send();
  }
})

const authenticateToken = (req: any, res: Response, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token === null) {
    res.status(401).send(new UserErrors().notExistedUser());
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  })
}

module.exports = {
  registerUser,
  authenticateUser
}
