import { Router } from 'express';
import blogRouter from './entries';
import tagsRouter from './tags';

const router = Router();
router.use('/entries', blogRouter);
router.use('/tags', tagsRouter);

export default router;
