const ApiError = require('../exceptions/api.error')
import { Request, Response } from 'express'

module.exports = function(err: any, req: Request, res: Response, next: any) {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Something went wrong" });
}
