import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { secret } from '../../config/keys';

const publicUris: Array<string> = [
  '/',
  '/api/login'
];

export function authenticate(req: Request, res: Response, next: NextFunction) {
  if (!publicUris.find(uri => uri === req.url)) {
    const token = req.headers.authtoken;
    try {
      const decoded = jwt.decode(token);
      const status = jwt.verify(token, secret[decoded.n]);
    } catch (err) {
      res.status(401).json({ message: "You are not authenticated." });
    }
  }
  next();
}