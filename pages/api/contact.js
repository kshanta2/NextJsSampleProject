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
    try {
      client = await MongoClient.connect(
        "mongodb+srv://admin:admin123@nextjsdata.4ldae.mongodb.net/myBlogSite?retryWrites=true&w=majority"
      );
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
