import React from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { Link, Outlet, useLocation } from "react-router-dom";
import Topbar from "./Topbar";
import Logo from "../assets/logo/logo.png";

export default function Sidebar() {
  let location = useLocation().pathname;

  return (
    <div className="line">
      <div className="Sidebar">
        <div className="SidebarLogo">
          <img className="SidebarLogoIcon" src={Logo} alt="DSW Logo" />
          <p>DWS</p>
        </div>
        <ul className="SidebarList">
          {SidebarData.map((val, key) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                className="SidebarRow"
                id={location === val.link ? "active" : ""}
                key={key}
                to={val.link}
                onClick={() => {
                  location = val.link;
                }}
              >
                <div id="icon" className="SidebarIcon">
                  {val.icon}
                </div>
                {""}
                <div id="title" className="SidebarTitle">
                  {val.title}
                </div>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="column">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}
