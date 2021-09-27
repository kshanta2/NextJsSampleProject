import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://mongo:9AcU1rZCMlBUOpms@nextjsdata.4ldae.mongodb.net/authDemo?retryWrites=true&w=majority"
  );

  return client;
}
