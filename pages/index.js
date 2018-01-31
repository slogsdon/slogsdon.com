import Head from "next/head";

import BlankLayout from "../components/blank-layout";
import Menu from "../components/menu";

import { description, title } from "../lib/settings";

const IndexPage = () => (
  <BlankLayout>
    <Head>
      <title>{title}</title>
    </Head>
    <main className="container">
      <h1 className="title">{title}</h1>
      <p className="description">{description}</p>
      <Menu index={true} />
    </main>
    <style jsx>{`
      .container {
        margin: 10rem auto;
        max-width: 650px;
        padding: 0 0.5rem;
      }

      .title {
        font-size: 3rem;
      }

      .description {
        font-size: 1.5rem;
        line-height: 2rem;
      }
    `}</style>
  </BlankLayout>
);

export default IndexPage;
