import Link from "next/link";

const Footer = () => (
  <footer className="menu-container">
    <ul className="menu">
      <li className="menu-item">
        <Link prefetch href="/">
          <a>Intro</a>
        </Link>
      </li>
      <li className="menu-item">
        <Link prefetch href="/work/">
          <a>Work</a>
        </Link>
      </li>
      <li className="menu-item">
        <Link prefetch href="/writing/">
          <a>Writing</a>
        </Link>
      </li>
      <li className="menu-item">
        <Link prefetch href="/decks/">
          <a>Decks</a>
        </Link>
      </li>
      <li className="menu-item">
        <Link prefetch href="/about/">
          <a>About</a>
        </Link>
      </li>
    </ul>
    <style jsx>{`
      .menu-container {
        border-top: 1px solid #e9e9e9;
        margin-top: 1.5rem;
        padding: 3rem 0;
      }

      .menu {
        font-weight: 700;
        list-style: none;
        margin: 1rem 0;
        padding: 0;
      }

      .menu-item {
        display: inline-block;
        margin: 0;
        margin-right: 1.5rem;
      }

      .menu-item a {
        color: #727272;
      }
    `}</style>
  </footer>
);

export default Footer;
