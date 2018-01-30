import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage, res }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles, prod: (!res || !res.socket) };
  }

  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          {this.props.prod && (
            <script async={true} src="/static/scripts/register-service-worker.js" />
          )}
        </body>
      </html>
    );
  }
}
