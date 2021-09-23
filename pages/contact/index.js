import { Fragment } from "react";
import ContactForm from "../../components/contact/contact-form";
import Head from "next/head";
function ContactPage(props) {
  return (
    <Fragment>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="You can contact me from here" />
      </Head>
      <ContactForm></ContactForm>
    </Fragment>
  );
}

export default ContactPage;
