import { Request, Response  } from 'express';
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

class UserController {
  async registration(req: Request, res: Response, next: any) {
    try {
    //  const errors = validationResult(req);

  //    if (errors.isEmpty()) {
  //      return next();
  //    }

      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData);

    } catch (e) {
      next(e);

    }
  }

  async login(req: Request, res: Response, next: any) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData);

    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: any) {
    try {
    const {refreshToken} = req.cookies;
    await userService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.json("logout");

    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController();
