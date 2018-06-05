import * as React from "react";
import Nav from "../components/nav";

const App = ({ render }) => (
  <React.Fragment>
    <Nav />
    <hr />
    {render()}
  </React.Fragment>
);

export default App;
