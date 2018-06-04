import * as React from "react";
import Nav from "../components/nav";

export default ({ render }) => (
  <React.Fragment>
    <Nav />
    <hr />
    {render()}
  </React.Fragment>
);
