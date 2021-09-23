import { useEffect, useRef, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(contactData) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mesasge || "Something went wrong");
  }
}

function ContactForm() {
  const emailIdRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();
  const [requestStatus, setRequestStatus] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function onSubmitHandler(event) {
    event.preventDefault();
    const inputEmailId = emailIdRef.current.value;
    const inputName = nameRef.current.value;
    const inputMesasge = messageRef.current.value;

    const contactData = {
      email: inputEmailId,
      name: inputName,
      message: inputMesasge,
    };
    setRequestStatus("pending");
    try {
      await sendContactData(contactData);
      setRequestStatus("success");
    } catch (error) {
      setRequestStatus("error");
    }
    emailIdRef.current.value = "";
    nameRef.current.value = "";
    messageRef.current.value = "";
  }

  let notificationData;

  if (requestStatus === "pending") {
    notificationData = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }
  if (requestStatus === "success") {
    notificationData = {
      status: "success",
      title: "Message sent successfully.",
      message: "We recieved your message. Someone will contact you soon!",
    };
  }
  if (requestStatus === "error") {
    notificationData = {
      status: "error",
      title: "Sending message failed",
      message: "Your message couldn't be send now. Please try later!",
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailIdRef}></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={nameRef}></input>
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea id="message" rows="5" required ref={messageRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {requestStatus && (
        <Notification
          status={notificationData.status}
          title={notificationData.title}
          message={notificationData.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
