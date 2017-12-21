import Link from "gatsby-link";
import * as React from "react";

export default function Menu({styles}: any) {
  if (!styles) {
    styles = {};
  }
  return (
    <nav className={styles.menuContainer}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link to="/work/">Work</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/writing/">Writing</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/decks/">Decks</Link>
        </li>
      </ul>
    </nav>
  );
}
