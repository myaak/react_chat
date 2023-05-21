import { Request, Response  } from 'express'
const userService = require('../services/user.service')

class UserController {
  async registration(req: Request, res: Response, next: any) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData);

    } catch (e) {
      console.log(e);

    }
  }

  async login(req: Request, res: Response, next: any) {
    try {

    } catch (e) {

    }
  }

  async logout(req: Request, res: Response, next: any) {
    try {

    } catch (e) {

    }
  }
}

module.exports = new UserController();
