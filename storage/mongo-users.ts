import { Collection, MongoClient } from 'mongodb';
import { RecType } from '../types/item';
const PropertiesJson = {serverUrlLocal: "mongodb://192.168.1.66:27017/",
serverUrl: ""};

const url = PropertiesJson.serverUrl;

const dbName = 'travelapp';
const collectionName = 'users';

const getMongoInstance = async () => {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  return client.db(dbName);
}

const getCollection = async (): Promise<Collection> => {
  const db = await getMongoInstance();

  return db.collection(collectionName);
}

const listMeals = async () => {
  const collection = await getCollection();

  const list = collection.find({}).toArray();
  let meals = [];
  (await list).forEach((el) => {
    meals.push({"strMeal": el.strMeal, "strCategory": el.strCategory, "idMeal": el.idMeal, "strMealThumb": el.strMealThumb})
  })

  return meals;
};

const listCategories = async () => {
  const collection = await getCollection();
  const list = collection.find({}).toArray();
  let mapCategories = new Map();

  (await list).forEach((el) => {
  const cat = el.strCategory;
    if (mapCategories.get(cat)) mapCategories.set(cat, mapCategories.get(cat) + 1);
        else {mapCategories.set(cat,1)}
  });
  
  return Array.from(mapCategories);
};

const listAreas = async () => {
  const collection = await getCollection();
  const list = collection.find({}).toArray();
  let mapAreas = new Map();

  (await list).forEach((el) => {
    const area = el.strArea;
    if (mapAreas.get(area)) mapAreas.set(area, mapAreas.get(area) + 1);
        else {mapAreas.set(area,1)}
  });
  
  return Array.from(mapAreas);
};

const listArray = async (obj: object) => {
  const collection = await getCollection();
  const el = obj["el"];
  const reg = new RegExp(obj["reg"]);
  const receipts = await collection.find({ [el]: reg }).toArray();

  return receipts;
};

const getList = async () => {
  const collection = await getCollection();
  const list = collection.find({}).toArray();
    
  return list;
};

const getById = async (idMeal: string) => {
  const collection = await getCollection();

  return await collection.findOne({ idMeal });
};

const getByMeal = async (strMeal: string) => {
  const collection = await getCollection();

  return await collection.find({ strMeal }).toArray();
};

const getByCat = async (strCategory: string) => {
  const collection = await getCollection();

  return await collection.find({ strCategory }).toArray();
};

const getByArea = async (strArea: string) => {
  const collection = await getCollection();

  return await collection.find({ strArea }).toArray();
};

const create = async (item: RecType) => {
  const collection = await getCollection();

  const response = await  collection.insertOne(item);

  return response.ops[0];
};

const update = async (item: RecType) => {
  const collection = await getCollection();

  const strMeal = item.strMeal;

  const response = await collection.replaceOne({ strMeal }, item);

  return response.ops[0];
};

const remove = async (id: string) => {
  const collection = await getCollection();

  return collection.deleteOne({ id });
};

export {
  getList,
  listMeals,
  listCategories,
  listAreas,
  listArray,
  getById,
  getByMeal,
  getByCat,
  getByArea,
  create,
  update,
  remove
}
