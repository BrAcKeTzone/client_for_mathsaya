import React from "react";
import Navbar from "./Navbar";

function NavLayout({ children, userRole }) {
  return (
    <>
      <Navbar userRole={userRole} />
      <div className="content-container">{children}</div>
    </>
  );
}

export default NavLayout;
