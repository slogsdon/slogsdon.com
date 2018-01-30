import Head from "next/head";

const BlankLayout = ({ children }) => (
  <div>
    <Head>
      <html lang="en" />
    </Head>

    {children}

    <style jsx global>{`
      body,
      html {
        font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
          helvetica, helvetica neue, ubuntu, roboto, noto, segoe ui, arial,
          sans-serif;
        font-size: 16px;
        line-height: 1.5rem;
        margin: 0;
        padding: 0;
      }

      h1 {
        line-height: 2.5rem;
      }
      h2,
      h3,
      h4,
      h5,
      h6 {
        line-height: 2rem;
      }

      a {
        color: #000;
        font-weight: 700;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      hr {
        border-collapse: collapse;
        border: 0;
        border-top: 1px solid #e9e9e9;
        margin: 1.5rem 0;
      }
    `}</style>
  </div>
);

export default BlankLayout;
