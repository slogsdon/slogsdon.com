import * as React from "react";
import { default as Markdown } from "react-markdown";
import { Link } from "react-router-dom";

const PageWork = ({ intro, items, outro, title }) => {
  let content;

  if (items) {
    content = items.map(i => {
      const label = i.label;
      const link = i.link;
      const description = i.description;

      return (
        <article key={link}>
          <Link to={link}>{label}</Link>
          <Markdown source={description} />
        </article>
      );
    });
  }

  return (
    <React.Fragment>
      <h1>{title}</h1>
      {intro && <Markdown source={intro} />}
      {content}
      {outro && (
        <React.Fragment>
          <hr />
          <Markdown source={outro} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PageWork;
