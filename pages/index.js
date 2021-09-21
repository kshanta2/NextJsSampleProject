import Link from "next/link";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import Head from "next/head";
import NewsletterRegistration from "../components/input/newsletter-registration";
function HomePage(props) {
  const featuredEvents = props.events;

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="A lot of events" />
      </Head>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 60,
  };
}

export default HomePage;
