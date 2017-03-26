import { UserInstance } from '../models/user';
import { Request, Response, NextFunction, Router } from 'express';
import { models } from '../models/index';
import * as bcrypt from 'bcryptjs';
const router = Router();

router.post('/login', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const user: UserInstance = await models.User.findOne({
      where: {
        username: req.body.username
      }
    });
    const passCheck:boolean = await bcrypt.compare(req.body.password, user.password);
    if (!user || !passCheck) {
      res.status(400).json({ message: "Username and Password combination is not found." });
    } else {
      const token:string = await user.generateToken();
      res.json({
        user,
        authToken: token
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
});

export default router;