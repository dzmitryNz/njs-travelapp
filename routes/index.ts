import { Router } from 'express';
const indexRouter = Router();
import * as storage from '../storage/mongo-countries';

indexRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*" );
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

indexRouter.get('/', async (req, res, next) => {
  const list = await storage.listAll();
  res.json(list);
});

indexRouter.get('/:name', async (req, res, next) => {

  const item = await storage.getByCountry(req.params["name"]);
  
  res
  .status(item ? 200 : 404)
  .json(item ?? { statusCode: 404 });
});

export default indexRouter;
