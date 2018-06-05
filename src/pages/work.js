import * as React from "react";
import { default as Markdown } from "react-markdown";

import Loading from "../components/loading";
import WorkList from "../components/work-list";
import * as data from "../data/pageWork";

export default class Work extends React.Component {
  render() {
    return <WorkList {...data} />;
  }
}
