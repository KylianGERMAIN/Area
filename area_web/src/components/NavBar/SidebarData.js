import React from "react";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiOutlineHome/>,
    cName: "nav-text",
  },
  {
    title: "Services",
    path: "/services",
    icon: <AiIcons.AiOutlineApi/>,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <AiIcons.AiOutlineSetting/>,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/",
    icon: <AiIcons.AiOutlinePoweroff/>,
    cName: "nav-text",
  },
];
