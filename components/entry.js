import Link from "next/link";

const Entry = ({ entry }) => (
  <article className="entry">
    <h2 className="title">
      <Link prefetch href={entry.slug}>
        <a>{entry.title}</a>
      </Link>
    </h2>

    <p className="description">{entry.description}</p>
    <style jsx>{`
      .entry {
        padding: 0.5rem 0;
      }

      .entry :global(p) {
        font-family: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif",
          Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif",
          Georgia, serif;
      }
    `}</style>
  </article>
);

export default Entry;
