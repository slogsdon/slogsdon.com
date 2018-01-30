import Link from "next/link";

const Menu = (props) => (
  <nav className={`${props.index ? "index-page" : ""} menu-container`}>
    <ul className="menu">
      <li className="menu-item">
        <Link prefetch href="/work">
          <a>Work</a>
        </Link>
      </li>
      <li className="menu-item">
        <Link prefetch href="/writing">
          <a>Writing</a>
        </Link>
      </li>
      <li className="menu-item">
        <Link prefetch href="/decks">
          <a>Decks</a>
        </Link>
      </li>
    </ul>
    <style jsx>{`
      .menu-container {
        float: right;
      }

      .menu {
        font-weight: 700;
        list-style: none;
        margin: 1rem 0;
        padding: 0;
      }

      .menu-item {
        display: inline;
        margin-left: 0.5rem;
      }

      .index-page.menu-container {
        float: none;
      }

      .index-page.menu-container .menu-item {
        font-size: 1.5rem;
        margin-left: 0;
        margin-right: 0.75rem;
      }
    `}</style>
  </nav>
);

export default Menu;
