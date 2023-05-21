import { Request, Response } from 'express';
const bcrypt = require('bcrypt');

const registerUser = (async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const salt = bcrypt.genSalt();
    const hasshedPassword = await bcrypt.hash(password, salt);
    const user = {
      email: email,
      password: hasshedPassword
    }
    res.status(201).send()

    // pg user push
  } catch {
    res.status(500).send()
  }
})

const authenticateUser = (async (req: Request, res: Response) => {
})

module.exports = {
  registerUser
}
