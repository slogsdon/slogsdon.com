import * as React from "react";
import { default as Markdown } from "react-markdown";
import { Link } from "react-router-dom";

const PageWriting = ({ intro, items, outro, title }) => {
  let content;

  if (items) {
    content = items.map(i => {
      const title = i.title;
      const slug = i.slug;
      const excerpt = i.excerpt;

      return (
        <article key={slug}>
          <Link to={`/writing/${slug}`}>{title}</Link>
          <time datetime={new Date(i.date).toISOString()}>{i.date}</time>
          <Markdown source={excerpt} />
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

export default PageWriting;
