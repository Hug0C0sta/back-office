import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import StoreIcon from "@mui/icons-material/Store";
import LogoutIcon from "@mui/icons-material/Logout";

export const SidebarData = [
  {
    title: "Início",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    title: "Utilizadores",
    icon: <GroupIcon />,
    link: "/users",
  },
  {
    title: "Lojas",
    icon: <StoreIcon />,
    link: "/stores",
  },
  {
    title: "Terminar Sessão",
    icon: <LogoutIcon />,
    link: "/logout",
  },
];
