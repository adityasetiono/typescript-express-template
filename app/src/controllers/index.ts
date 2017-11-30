import { Request, Response, NextFunction, Router } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile('/code/public/index.html');
});

export default router;
