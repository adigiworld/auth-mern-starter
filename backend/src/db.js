import { MongoClient } from "mongodb";

let mongo;
export const initializeDBConnection = async () => {
  mongo = await new MongoClient(process.env.MONGO_DATABASE).connect();
}
export const connectDatabase = (dbName) => {
  const db = mongo.db(dbName);
  return db;
}

export const closeDBConnection = () => {
  // mongo.close();
}
