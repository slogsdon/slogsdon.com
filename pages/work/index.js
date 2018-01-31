import Head from "next/head";

import Image from "../../components/image";
import MainLayout from "../../components/main-layout";

import { title } from "../../lib/settings";

const WorkPage = ({ data }) => (
  <MainLayout>
    <main className="container">
      <Head>
        <title>{"Work - " + title}</title>
      </Head>

      <h1>Work</h1>

      <article className="project">
        <Image src="/static/images/secure-submit.png" height="290px" />

        <h2>
          <a
            href="https://github.com/hps/heartland-tokenization"
            target="_blank"
          >
            Secure Submit
          </a>
        </h2>

        <p>
          Heartland Payment System's JavaScript library provides single-use
          tokenization capabilities for card present and card not present
          merchants.
        </p>
      </article>

      <article className="project">
        <Image src="/static/images/sap.png" height="290px" />

        <h2>
          <a href="https://github.com/slogsdon/sap" target="_blank">
            Sap
          </a>
        </h2>

        <p>
          Toolkit for Elixir web applications to accept and respond to HTTP
          requests by using a decision tree built with combinators.
        </p>
      </article>

      <hr />

      <p>See other contributions under these organizations:</p>

      <ul>
        <li>
          <a href="https://github.com/slogsdon" target="_blank">
            @slogsdon
          </a>{" "}
          on GitHub
        </li>
        <li>
          <a href="https://github.com/hps" target="_blank">
            @hps
          </a>{" "}
          on GitHub
        </li>
        <li>
          <a href="https://github.com/GlobalPayments" target="_blank">
            @GlobalPayments
          </a>{" "}
          on GitHub
        </li>
      </ul>
    </main>
  </MainLayout>
);

export default WorkPage;
