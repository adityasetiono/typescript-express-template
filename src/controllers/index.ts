import { Request, Response, NextFunction, Router } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'This is home page'
  });
});

export default router;