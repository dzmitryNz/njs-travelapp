import { Router } from 'express';
import * as storage from '../storage/mongo-showplaces';
const countriesRouter = Router();

countriesRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*" );
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

countriesRouter.get('/all', async (req, res, next) => {
  const list = await storage.listPlaces();
  res.json(list);
});

countriesRouter.get('/country/:country', async (req, res, next) => {

  const item = await storage.listCountryPlaces(req.params["country"]);

  res
  .status(item ? 200 : 404)
  .json(item ?? { statusCode: 404 });
});

countriesRouter.get('/id/:idprop', async (req, res, next) => {

  const item = await storage.getById(req.params["idprop"]);

  res
  .status(item ? 200 : 404)
  .json(item ?? { statusCode: 404 });
});

countriesRouter.post('/array', async (req, res, next) => {
  const { body } = req;
  const list = await storage.listArray(body);
  res.json(list);
});

countriesRouter.get('/popular', async (req, res, next) => {
  const list = await storage.listPopular();
  res.json(list);
});

countriesRouter.get('/rating', async (req, res, next) => {
  const list = await storage.listByRating();
  res.json(list);
});

export default countriesRouter;
