import { v4 as uuid } from 'uuid';
import { Router } from 'express';
import * as storage from '../storage/mongo-users';
const usersRouter = Router();

/* GET users listing. */
usersRouter.get('/', async (req, res, next) => {
  const list = await storage.getList();
  res.json(list);
});

usersRouter.get('/i', async (req, res, next) => {

  const item = await storage.getById(req.params["strIngredient"]);

  res
  .status(item ? 200 : 404)
  .json(item ?? { statusCode: 404 });
});

usersRouter.get('/cat', async (req, res, next) => {

  const item = await storage.getByCat(req.params["strCategory"]);

  res
  .status(item ? 200 : 404)
  .json(item ?? { statusCode: 404 });
});

usersRouter.post('/', async (req, res, next) => {
  const id = uuid();
  const { body } = req;
  body.id = id;
  const newBody = await storage.create(body);
  res.json(newBody);
});

usersRouter.put('/:id', async (req, res, next) => {
  const { body } = req;
  const newBody = await storage.update({
    ...body,
    id: req.params.id
  });
  res.json(newBody);
});

usersRouter.delete('/:id', async (req, res, next) => {
  
  await storage.remove(req.params["id"]);

  res
  .status(204)
  .json(null);
});

export default usersRouter;
