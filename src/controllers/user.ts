import { UserInstance } from '../models/user';
import { Request, Response, NextFunction, Router } from 'express';
import { models } from '../models/index';
const router = Router();

router.get('/', async function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users: Array<UserInstance> = await models.User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Internal server error.' });
  }
});

router.post('/', async function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await models.User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: err.message });
  }
});

router.get('/:id', async function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user: UserInstance = await models.User.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: 'User not found.' });
  }
});

router.put('/:id', async function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const x = await models.User.update(req.body, {
      where: {
        id: req.params.id
      },
      fields: ['name']
    });
    console.log(x);
    res.json({});
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Internal server error.' });
  }
});

export default router;
