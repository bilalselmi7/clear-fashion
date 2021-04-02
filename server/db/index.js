require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');


const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = `mongodb+srv://bilal:webapp@cluster0.kfwer.mongodb.net/${MONGODB_DB_NAME}?retryWrites=true&w=majority`;
                    
let client = null;
let database = null;

/**
 * Get db connection
 * @type {MongoClient}
 */
const getDB = module.exports.getDB = async () => {
  try {
    if (database) {
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};

//---------------------------------------------------------------------
/**
 * Insert list of products
 * @param  {Array}  products
 * @return {Object}
 */
module.exports.insert = async products => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.insertMany(products);

    return result;
  } catch (error) {
    console.error('🚨 collection.insertMany...', error);
    fs.writeFileSync('products.json', JSON.stringify(products));
    return {
      'insertedCount': 0
    };
  }
};
//-------------------------------------------------------------------


module.exports.findByPrice = async price => {
  try {
    const mydb = await getDB();
    const mycollection = mydb.collection(MONGODB_COLLECTION);
    const found = await mycollection.find({"price":{$lte:price}});

    return found;
  } catch (error) 
  {
    console.error('🚨 Collection.find...', error);
    return null;
  }
};

//-------------------------------------------------------------------

/**
 * Find products based on query
 * @param  {Array}  query
 * @return {Array}
 */
 module.exports.findByBrand = async brand => {
  try {

    const mydb = await getDB();
    const mycollection = mydb.collection(MONGODB_COLLECTION);
    const found = await mycollection.find({brand:brand});

    return found;
  } catch (error) 
  {
    console.error('🚨 Collection.find...', error);
    return null;
  }
};

//-------------------------------------------------------------------


module.exports.find = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};


/**
 * Close the connection
 */
module.exports.close = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error('🚨 MongoClient.close...', error);
  }
};