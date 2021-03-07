import { Collection, MongoClient } from 'mongodb';
import { RecType } from '../types/item';
const PropertiesJson = {serverUrlLocal: "mongodb://192.168.1.66:27017/",
serverUrl: "mongodb+srv://test:test@cluster0.5mot7.mongodb.net/"};

const url = PropertiesJson.serverUrlLocal;

const dbName = 'home-planner';
const collectionName = 'receipts';

const getMongoInstance = async () => {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true, connectTimeoutMS: 50000 });

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

const listPopular = async () => {
  const collection = await getCollection();
  const find = {strRequestsCounter: {$gt: 0}};
  const sort = {strRequestsCounter: -1};
  const limit = 50;
  const list = collection.find(find).sort(sort).limit(limit).toArray();
    
  return list;
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

const updCount = async (chngRec: string) => { 
  const collection = await getCollection();
  const doc = await collection.findOne({idMeal: chngRec})
  const value = doc.strRequestsCounter + 1;
  const newValue = {$set: {strRequestsCounter: value}}
  console.log(chngRec, doc.strRequestsCounter) 
  await collection.updateOne(doc, newValue, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
  }

const listArray = async (obj: object) => {
  const collection = await getCollection();
  const el = obj["el"];
  const reg = new RegExp(obj["reg"]);
  const chngRec = obj["cat"];
  if (chngRec) {
    updCount(chngRec);
  }
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
  listPopular,
  listArray,
  getById,
  getByMeal,
  getByCat,
  getByArea,
  create,
  update,
  remove
}
