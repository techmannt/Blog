import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/:id', async (req, res) => {
  try {

    const id = req.params.id;
    let chirps = await db.users.findBlogEntry(id);
    res.json(chirps);
  } catch (error) {
    console.log(error);
    res.status(500).json('You have an error!');
  }
})

router.get('/', async (req, res) => {
  try {
    let users = await db.users.findUsers();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json('You have an error!');
  }
})


export default router;
