import Link from "gatsby-link";
import * as React from "react";

interface IWritingEntry {
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    description?: string;
  };
}

interface IEntryProps {
  entry: IWritingEntry;
  styles?: any;
}

export default function Entry({ entry, styles }: IEntryProps) {
  if (!styles) {
    styles = {};
  }

  return (
    <article className={styles.entry}>
      <h2 className={styles.title}>
        <Link to={entry.fields.slug}>{entry.frontmatter.title}</Link>
      </h2>

      <p className={styles.description}>
        {entry.frontmatter.description || entry.excerpt}
      </p>
    </article>
  );
}
