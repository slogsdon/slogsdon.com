import Head from "next/head";

import Entry from "../../components/entry";
import MainLayout from "../../components/main-layout";
import { deckList } from "./_list";

import { title } from "../../lib/settings";

const DecksPage = () => (
  <MainLayout>
    <main className="container">
      <Head>
        <title>{"Slide Decks - " + title}</title>
      </Head>

      <h1>Slide Decks</h1>

      {deckList.map((entry) => {
        return <Entry entry={entry} key={entry.slug} />;
      })}
    </main>
  </MainLayout>
);

export default DecksPage;
