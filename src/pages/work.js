import * as React from "react";
import { default as Markdown } from "react-markdown";

import Loading from "../components/loading";
import PageWork from "../components/page-work";
import * as data from "../data/pageWork";

export default class Work extends React.Component {
  render() {
    return <PageWork {...data} />;
  }
}
