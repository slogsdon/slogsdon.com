import * as React from "react";
import { default as Markdown } from "react-markdown";

const PageWritingPost = ({ title, body }) => (
  <React.Fragment>
    <h1>{title}</h1>
    <Markdown source={body} />
  </React.Fragment>
);

export default PageWritingPost;
