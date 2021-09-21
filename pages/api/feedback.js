import fs from "fs";
import path from "path";

export function getFeedBackPath() {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  return filePath;
}

export function getParsedFeedbackData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      email: email,
      text: feedbackText,
    };
    const filePath = getFeedBackPath();
    const data = getParsedFeedbackData(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({
      message: "Success",
    });
    //store it in a database or in a file
  } else {
    const filePath = getFeedBackPath();
    const feedback = getParsedFeedbackData(filePath);
    res.status(200).json({
      feedback,
    });
  }
}

export default handler;
