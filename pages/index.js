import Head from "next/head";
import { useRef, useState } from "react";
function HomePage(props) {
  const featuredEvents = props.events;
  const [feedbackItem, setFeedbackItems] = useState();
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const requestBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFeedbackItems(data.feedback);
      });
  }

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="A lot of events" />
      </Head>
      <h1>Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feeback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Submit Feedback</button>
      </form>

      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
    </div>
  );
}

export default HomePage;
