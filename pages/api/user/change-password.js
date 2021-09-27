import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "User not Authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const newHashedPassword = await hashPassword(newPassword);
  const oldHashedPassword = await hashPassword(oldPassword);
  const client = await connectToDatabase();
  const userCollection = client.db().collection("users");

  const userDocument = await userCollection.findOne({ email: userEmail });

  if (!userCollection) {
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  const currentPassword = userDocument.password;
  const result = verifyPassword(oldPassword, currentPassword);

  if (!result) {
    res
      .status(403)
      .json({ message: "Your old password dont match in our records" });
    client.close();
    return;
  }

  const updateResult = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: newHashedPassword } }
  );

  client.close();

  res.status(200).json({ message: "Password updated" });
}

export default handler;
