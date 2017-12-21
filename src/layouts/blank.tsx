import * as React from "react";
import Helmet from "react-helmet";

export default ({ children }: any) => (
  <div>
    <Helmet>
      <html lang="en" />
    </Helmet>

    {children()}
  </div>
);
