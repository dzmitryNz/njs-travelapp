import { Collection, MongoClient } from 'mongodb';
import { showplaceType } from '../types/item';
const PropertiesJson = { serverUrlLocal: "mongodb://192.168.1.66:27017/",
serverUrl: "mongodb+srv://test:test@cluster0.5mot7.mongodb.net/" };

const url = PropertiesJson.serverUrl;

const dbName = 'travelapp';
const collectionName = 'showplaces';

const getMongoInstance = async () => {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true, connectTimeoutMS: 50000 });

  return client.db(dbName);
}

const getCollection = async (): Promise<Collection> => {
  const db = await getMongoInstance();

  return db.collection(collectionName);
}

const listPlaces = async () => {
  const collection = await getCollection();

  const list = collection.find({}).toArray();
  let places = [];
  (await list).forEach((el) => {
    places.push({"id": el.id, "nameRu": el.nameRu, "nameBe": el.nameBe, "nameEn": el.nameEn, "coord": el.coord, "articleRu": el.articleRu, "articleBe": el.articleBe, "articleEn": el.articleEn, "photoSrc1": el.photoSrc1, "rating": el.rating, "votes": el.votes})
  })
  console.log(list, places)
  return places;
};

const listCountryPlaces = async (country: string) => {
  const collection = await getCollection();
  const list = collection.find({ country }).toArray();
  let countryPlaces = [];
  (await list).forEach((el) => {
    countryPlaces.push({"id": el.id, "nameRu": el.nameRu, "nameBe": el.nameBe, "nameEn": el.nameEn, "coord": el.coord, "articleRu": el.articleRu, "articleBe": el.articleBe, "articleEn": el.articleEn, "photoSrc1": el.photoSrc1, "rating": el.rating, "votes": el.votes})
  })
  return countryPlaces
};

const getById = async (id: string) => {
  const collection = await getCollection();
  const list = collection.findOne({id});
  console.log(typeof id, id, list)
  return list;
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
  const find = {views: {$gt: 0}};
  const sort = {views: -1};
  const limit = 12;
  const list = collection.find(find).sort(sort).limit(limit).toArray();

  let popularPlaces = [];
  (await list).forEach((el) => {
    popularPlaces.push({"id": el.id, "nameRu": el.nameRu, "nameBe": el.nameBe, "nameEn": el.nameEn, "coord": el.coord, "articleRu": el.articleRu, "articleBe": el.articleBe, "articleEn": el.articleEn, "photoSrc1": el.photoSrc1, "rating": el.rating, "votes": el.votes})
  })
  return popularPlaces;
};

const listByRating = async () => {
  const collection = await getCollection();
  const find = {rating: {$gt: 0}};
  const sort = {rating: -1};
  const limit = 10;
  const list = collection.find(find).sort(sort).limit(limit).toArray();
    
  return list;
};

const updViews = async (chngRec: string) => { 
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
    updViews(chngRec);
  }
  const receipts = await collection.find({ [el]: reg }).toArray();

  return receipts;
};

export {
  listPlaces,
  listCountryPlaces,
  listCategories,
  listPopular,
  listByRating,
  listArray,
  getById
  }
