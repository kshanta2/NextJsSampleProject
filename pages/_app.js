import Layout from "../components/layout/layout";
import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meat name="viewport" content="initial-scale=1.0, width=device-with" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
