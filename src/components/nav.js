import * as React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
  <React.Fragment>
    <Link to="/work">Work</Link>
    <Link to="/writing">Writing</Link>
  </React.Fragment>
);

export default Nav;
