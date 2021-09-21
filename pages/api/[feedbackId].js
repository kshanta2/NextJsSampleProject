import { getFeedBackPath, getParsedFeedbackData } from "./feedback";

function handler(req, res) {
  if (req.method === "POST") {
  } else {
    const feedbackId = req.query.feedbackId;
    const filePath = getFeedBackPath();
    const feedbackData = getParsedFeedbackData(filePath);
    const selectFeedBack = feedbackData.find(
      (feedback) => feedback.email === feedbackId
    );
    res.status(200).json({
      feedback: selectFeedBack,
    });
  }
}

export default handler;
