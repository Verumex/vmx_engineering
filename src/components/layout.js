import React from "react";
import { MDXProvider } from "@mdx-js/react";
import ThemeProvider from "./themeProvider";
import mdxComponents from "./mdxComponents";
import Sidebar from "./sidebar";
import RightSidebar from "./rightSidebar";

const Wrapper = ({ children }) => (
  <div className="body-wrapper">{children}</div>
);

const Content = ({ children }) => (
  <main className="content-wrapper">{children}</main>
);

const MaxWidth = ({ children }) => <div className="max-width">{children}</div>;

const Layout = ({ children, location }) => (
  <ThemeProvider location={location}>
    <MDXProvider components={mdxComponents}>
      <Wrapper>
        <div className="hidden-xs">
          <Sidebar location={location} />
        </div>
        <Content>
          <MaxWidth>{children}</MaxWidth>
        </Content>
        <div className="hidden-xs">
          <RightSidebar location={location} />
        </div>
      </Wrapper>
    </MDXProvider>
  </ThemeProvider>
);

export default Layout;
