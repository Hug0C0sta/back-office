import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import TableComponent from "../../Components/Table/TableComponent";

import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { CiSearch } from "react-icons/ci";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [showBlocked, setShowBlocked] = useState(false);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleChangeShowBlocked = (event) => {
    setShowBlocked(event.target.checked);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8080/api/v1/users", {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response.data;
      const users = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        blocked: user.blocked,
        created: user.createdString.substring(0, 10),
        role: user.role.name,
      }));

      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="containerUsers">
      <div className="rowInputsUserSearch">
        <TextField
          id="search"
          label="Procura"
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <CiSearch
                sx={{
                  pointerEvents: "none",
                  color: "gray",
                  marginRight: "10px",
                  fontSize: "15px",
                }}
              />
            ),
          }}
          sx={{ width: "300px" }}
        />
        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={handleChangeRole}
            variant="standard"
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"default"}>Default</MenuItem>
            <MenuItem value={"business"}>Business</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              defaultChecked={showBlocked}
              onChange={handleChangeShowBlocked}
            />
          }
          label="Utilizador Bloqueado"
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          data={users.filter((item) => {
            const isNameMatch =
              search.trim() === "" ||
              item.name.toLowerCase().includes(search.toLowerCase());
            const isEmailMatch =
              search.trim() === "" ||
              item.email.toLowerCase().includes(search.toLowerCase());
            const isRoleMatch =
              role.toLowerCase() === "all" ||
              item.role.toLowerCase() === "business" ||
              item.role.toLowerCase() === "default";
            const isBlockedMatch = showBlocked === item.blocked;
            return (
              isBlockedMatch && (isNameMatch || isEmailMatch) && isRoleMatch
            );
          })}
          width="100%"
          height="100%"
          editable="true"
        />
      </div>
    </div>
  );
}

export default Users;
