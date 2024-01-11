import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="d-flex flex-column vh-100 vw-100">
      <Navbar />
      <div className="row h-100 w-100">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
