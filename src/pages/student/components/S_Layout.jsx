import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="content-container">{children}</div>
    </>
  );
}

export default Layout;
