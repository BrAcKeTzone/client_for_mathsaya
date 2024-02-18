import React from "react";
import Navbar from "./Navbar";
import Bottombar from "./Bottombar";
import Cookies from "js-cookie";

function NavLayout({ children, userRole, server_url, usr }) {
  usr = JSON.parse(Cookies.get("SESSION_ID"));

  return (
    <>
      <Navbar userRole={userRole} server_url={server_url} usr={usr.id} />
      <div className="content-container">{children}</div>
      <Bottombar server_url={server_url} usr={usr.id} />
    </>
  );
}

export default NavLayout;
