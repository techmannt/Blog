import { Router } from 'express';
import ChirpsRouter from './chirps';
import usersRouter from './users';
import tagsRouter from './tags';

const router = Router();
router.use('/chirps', ChirpsRouter);
router.use('/users', usersRouter);
router.use('/tags', tagsRouter);

export default router;
