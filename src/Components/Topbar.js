import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { SearchbarData } from "./SearchbarData";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Divider from "@mui/material/Divider";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";

export default function Topbar() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      getUserLoggedIn();
    }
  }, []);

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if the token exists, indicating the user is logged in
  };

  const getUserLoggedIn = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/v1/users/authenticated-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserLoggedIn(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="TopBar" style={{ alignItems: "center" }}>
      <div className="TopBar-search">
        <SearchBar placeholder="O que queres fazer?" data={SearchbarData} />
      </div>
      <div>
        <NotificationsNoneIcon style={{ color: "#4a6a88" }} />
      </div>
      <Divider
        sx={{ height: 50, alignSelf: "center", width: 10, marginRight: 2 }}
        orientation="vertical"
        flexItem
      />

      {userLoggedIn && (
        <div className="Topbar-user" style={{ alignItems: "center" }}>
          <p style={{ marginRight: "10px" }}>{userLoggedIn.name}</p>
          {userLoggedIn.image ? (
            <img
              style={{ paddingLeft: "10px" }}
              className="TopBarUserPicture"
              src={userLoggedIn.image}
              alt="User"
            />
          ) : (
            <PersonIcon style={{ paddingLeft: "10px" }} />
          )}
        </div>
      )}
    </div>
  );
}
