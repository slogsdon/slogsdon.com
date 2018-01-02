import * as React from "react";
import Helmet from "react-helmet";

import PaymentForm from "../components/payment-form";

interface IPaymentRequestApiExamplePageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

export default ({ data }: IPaymentRequestApiExamplePageProps) => (
  <div>
    <Helmet title={"PaymentRequest API Example - " + data.site.siteMetadata.title} />

    <h1>PaymentRequest API Example</h1>

    <PaymentForm onError={(e) => alert(e)} />
  </div>
);

export const pageQuery = graphql`
  query PaymentRequestApiExamplePageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
