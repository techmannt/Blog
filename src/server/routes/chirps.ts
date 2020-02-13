import * as express from 'express';
import db from '../db';

const router = express.Router();

router.get('/:id', async (req, res) => {

  try {
    const id = req.params.id;
    let [data] = await db.chirpCrud.one(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json('There is an error!');
  }
})

router.get('/', async (req, res) => {

  try {
    let data = await db.chirpCrud.all();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json('There is an error!');
  }

});

router.post('/', async (req, res) => {

  try {
    let tag = req.body.tag;
    let title = req.body.title;
    let message = req.body.message;
    let result = await db.chirpCrud.addOne(tag, title, message);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json('There is an error!');
  }

});

router.put('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    let chirpID = req.params.id;
    let message = req.body.message;
    await db.chirpCrud.update(message, chirpID);
    res.json('Edited!');
  } catch (error) {
    console.log(error);
    res.status(500).json('There is an error!');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.chirpCrud.destroy(id);
    await db.chirpCrud.destroySomethingElse(id);
    res.json('Deleted!');
  } catch (error) {
    console.log(error);
    res.status(500).json('There is an error!');
  }
});

export default router;
