import Link from "next/link";

import BlankLayout from "./blank-layout";
import Footer from "./footer";
import Menu from "./menu";

const MainLayout = ({ children }) => (
  <BlankLayout>
    <div className="container">
      <header>
        <div className="title">
          <Link prefetch href="/">
            <a>SL</a>
          </Link>
        </div>
        <Menu />
        <div className="clear-both" />
      </header>
      {children}
      <Footer />
    </div>
    <style jsx>{`
      .container {
        margin: 0 auto;
        max-width: 650px;
        padding: 0 1rem;
      }

      .clear-both {
        clear: both;
      }

      .title {
        float: left;
        font-weight: 700;
        margin: 1rem 0;
        padding: 0;
      }
    `}</style>
  </BlankLayout>
);

export default MainLayout;
