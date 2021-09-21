import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:admin@nextjsdata.4ldae.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, documents) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(documents);
  return result;
}

export async function getAllDocuments(client, collections, sort) {
  const db = client.db();
  const result = await db.collection(collections).find().sort(sort).toArray();
  return result;
}
