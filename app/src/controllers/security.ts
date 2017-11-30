import { UserInstance } from 'src/models/user';
import { Request, Response, NextFunction, Router } from 'express';
import { models } from 'src/models/index';
import * as bcrypt from 'bcryptjs';
const router = Router();

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: UserInstance = await models.User.findOne({
        where: {
          username: req.body.username
        }
      });
      console.log('login user', user);
      const passCheck: boolean = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!user || !passCheck) {
        res
          .status(400)
          .json({ message: 'Username and Password combination is not found.' });
      }
      const token: string = await user.generateToken();
      res.json({
        user,
        authToken: token
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ err: err });
    }
  }
);

export default router;
