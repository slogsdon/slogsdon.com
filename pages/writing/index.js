import Head from "next/head";

import Entry from "../../components/entry";
import MainLayout from "../../components/main-layout";
import { postList } from "./_list";

import { title } from "../../lib/settings";

const WritingsPage = () => (
  <MainLayout>
    <main className="container">
      <Head>
        <title>{"Writing - " + title}</title>
      </Head>

      <h1>Writing</h1>

      {postList.map((entry) => {
        return <Entry entry={entry} key={entry.slug} />;
      })}
    </main>
  </MainLayout>
);

export default WritingsPage;
