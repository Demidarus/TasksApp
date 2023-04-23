import React from "react";
import PropTypes from "prop-types";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import { AlertProvider } from "../contexts/alert-context";

class Layout extends React.Component {
  render() {
    return (
      <>
        <AlertProvider>
          <AppNavbar />
          <main className="mt-16 mx-auto pb-16 p-4">{this.props.children}</main>
          <Footer />
        </AlertProvider>
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
