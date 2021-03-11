import { Collection, MongoClient } from 'mongodb';
const PropertiesJson = {serverUrlLocal: "mongodb://192.168.1.66:27017/",
serverUrl: ""};

const url = PropertiesJson.serverUrl;

const dbName = 'travelapp';
const collectionName = 'countries';

const getMongoInstance = async () => {
  const client = await MongoClient.connect(url);
  return client.db(dbName);
}

const getCollection = async (): Promise<Collection> => {
  const db = await getMongoInstance();

  return db.collection(collectionName);
}

const listAll = async () => {
  const collection = await getCollection();
  return collection.find({}).toArray();
};

const listArray = async (obj: object) => {
  const collection = await getCollection();
  const el = obj["el"];
  const reg = new RegExp(obj["reg"]);
  console.log(el, reg)
  const ingredients = await collection.find({ [el]: reg }).toArray();
  console.log(el, reg, ingredients)

  return ingredients;
};

const getByCountry = async (name: string) => {
  const collection = await getCollection();

  return await collection.findOne({ name });
};

const getByCat = async (strCategory: string) => {
  const collection = await getCollection();

  return await collection.findOne({ strCategory });
};


export {
  listAll,
  listArray,
  getByCountry,
  getByCat
}
