import Head from "next/head";

import {render as Entry} from "../../src/components/entry.fs";
import {render as MainLayout} from "../../src/components/main-layout.fs";
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
