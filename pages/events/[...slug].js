import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";
function FilteredEventsPage(props) {
  const router = useRouter();

  const filterData = router.query.slug;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://next-js-course-e7013-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  const [loadedEvents, setloadedEvents] = useState();
  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setloadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Laoding...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  //const filteredEvents = props.events;
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    console.log(eventDate);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the provided search criteria.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents}></EventList>
    </Fragment>
  );
}

/*export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return {
      props: { hasError: true },
      //notFound: true,
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  console.log(numYear);
  console.log(numMonth);
  console.log(filteredEvents);

  return {
    props: {
      events: filteredEvents,
      date: {
        month: numMonth,
        year: numYear,
      },
    },
  };
}*/

export default FilteredEventsPage;
