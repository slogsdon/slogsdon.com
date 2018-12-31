import * as React from "react";

import WritingList from "../components/WritingList.bs";
import WritingPost from "../components/WritingPost.bs";
import * as data from "../data/pageWriting";

const routes = [{ path: "/writing" }];
data.items.map(i =>
  routes.push({
    path: `/writing/${i.slug}`
  })
);

export default class Writing extends React.Component {
  static async getInitialProps() {
    return {
      routes,
      path: "/writing/:slug*"
    };
  }

  render() {
    if (this.props.match && this.props.match.params.slug) {
      const post = data.items
        .filter(i => i.slug === this.props.match.params.slug)
        .shift();
      return <WritingPost {...post} />;
    }

    return <WritingList data={data} />;
  }
}
