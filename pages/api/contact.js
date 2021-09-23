import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid data" });
      return;
    }

    //store it in database
    const newMessage = {
      email,
      name,
      message,
    };
    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.4ldae.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }
    const db = client.db();
    let result;
    try {
      result = await db.collection("messages").insertOne(newMessage);
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Something went wrong" });
      return;
    }
    //console.log(newMessage);
    client.close();
    res.status(201).json({
      message: "Successfully saved",
      transactionId: result.insertedId,
    });
  }
}

export default handler;
