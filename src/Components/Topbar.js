import SearchBar from "./SearchBar";
import SearchBarData from "./searchBarAppData.json";
import userPicture from "../assets/test/alonso.jpeg";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MinimizeIcon from "@mui/icons-material/Minimize";
import Divider from "@mui/material/Divider";

export default function Topbar() {
  return (
    <div className="TopBar">
      <div className="TopBar-search">
        <SearchBar placeholder="O que queres fazer?" data={SearchBarData} />
      </div>
      <div>
        <NotificationsNoneIcon style={{ color: "#4a6a88" }} />
      </div>
      <Divider
        sx={{ height: 50, alignSelf: "center", width: 10, marginRight: 2 }}
        orientation="vertical"
        flexItem
      />

      <div className="Topbar-user">
        <p style={{ marginRight: "10px" }}>Fernando Alonso</p>
        <img
          style={{ paddingLeft: "10px" }}
          className="TopBarUserPicture"
          src={userPicture}
          alt="User"
        />
      </div>
    </div>
  );
}
