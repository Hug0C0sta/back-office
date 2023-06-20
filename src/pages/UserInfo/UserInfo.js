import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Popper,
  Switch,
  TextField,
} from "@mui/material";
import CardComponent from "../../Components/Card/CardComponent";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import CircleIcon from "@mui/icons-material/Circle";
import BoltIcon from "@mui/icons-material/Bolt";
import FunctionsIcon from "@mui/icons-material/Functions";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MoneyIcon from "@mui/icons-material/Money";
import EuroIcon from "@mui/icons-material/Euro";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import async from "async";

const roles = [
  {
    value: "DEFAULT",
    label: "Default",
  },
  {
    value: "BUSINESS",
    label: "Business",
  },
  {
    value: "MANAGER",
    label: "Manager",
  },
  {
    value: "SYSTEM",
    label: "System",
  },
];

function getRandomDate() {
  const today = new Date();
  const end = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  );

  const randomTimestamp =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTimestamp);

  return randomDate;
}

function isOnline() {
  return Math.random() < 0.3;
}

function getRandomDayWithHour() {
  const randomDate = getRandomDate();
  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );

  const timeDiff = Math.abs(today.getTime() - randomDate.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Calculate the difference in days
  const randomHour = randomDate.getHours();

  if (randomDate.toDateString() === yesterday.toDateString()) {
    return `Ontem às` + randomHour;
  }

  return `À ${daysDiff} dias!`;
}

function UserInfo() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const idPopper = open ? "simple-popper" : undefined;

  const [user, setUserInfo] = useState();

  const { id } = useParams();

  useEffect(() => {
    getUserInfo();
  }, []);

  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [btnEdit, setBtnEdit] = useState(false);

  const toggleEdit = () => {
    setBtnEdit((prevEdit) => !prevEdit);
  };
  const userNameRef = useRef("");
  const userEmailRef = useRef("");
  const userNifRef = useRef("");
  const userPhoneRef = useRef("");
  const userRoleRef = useRef("");
  const userBlockedReasonRef = useRef("");

  const toggleSave = async (event) => {
    const userNameValue = userNameRef.current.value;
    const userEmailValue = userEmailRef.current.value;
    const userNifValue = userNifRef.current.value;
    const userPhoneValue = userPhoneRef.current.value;
    const userRoleValue = userRoleRef.current.value;
    const userBlockedValue = checked;
    const userBlockReasonValue = userBlockedReasonRef.current.value;

    const updatedUser = {
      name: userNameValue,
      email: userEmailValue,
      nif: userNifValue,
      phone: userPhoneValue,
      role: userRoleValue,
      blocked: userBlockedValue,
      blockedReason: userBlockReasonValue,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/users/${id}`,
        updatedUser,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBtnEdit(false);
      setAnchorEl(anchorEl ? null : event.currentTarget);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/${id}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserInfo(response.data);
      setChecked(response.data.blocked);
    } catch (error) {
      console.error(error);
    }
  };

  const [averageTransaction, setAverageTransaction] = useState();
  const [lastTransaction, setLastTransaction] = useState();
  const [favoriteCurrency, setFavoriteCurrency] = useState();
  const [favoritePayment, setFavoritePayment] = useState();
  const [primaryFunds, setPrimaryFunds] = useState();

  useEffect(() => {
    getAverageTransaction();
    getLastTransaction();
    getFavoriteCurrency();
    getFavoritePayment();
    getPrimaryFunds();
  }, []);

  const getAverageTransaction = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/transactions/average/${id}?currency=EUR`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAverageTransaction(response.data.averageAmount);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getLastTransaction = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/last-transaction/${id}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLastTransaction(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFavoriteCurrency = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/${id}/favorite-currency`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavoriteCurrency(response.data.currency);
    } catch (error) {
      console.error(error);
    }
  };

  const getFavoritePayment = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/${id}/favorite-payment`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavoritePayment(response.data.payment);
    } catch (error) {
      console.error(error);
    }
  };

  const getPrimaryFunds = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/${id}/primary-funds`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPrimaryFunds(response.data.balance);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user || !lastTransaction) {
    return <p>Loading...</p>;
  }

  const lastTimeOnline = getRandomDayWithHour();

  return (
    <>
      <div className="containerUserInfo">
        <div className="profileSpan3">
          <CardComponent
            height={checked ? "590px" : "440px"}
            width="100%"
            col="#333333"
            fontCol="#333333"
            name="Perfil"
            icon={AccountBoxIcon}
          >
            <div className="profileDetails">
              <TextField
                disabled={!btnEdit}
                id="userName"
                label="Nome"
                defaultValue={user.name}
                className="profileSpan2"
                inputRef={userNameRef}
                type="text"
              />
              <TextField
                disabled={!btnEdit}
                id="outlined-disabled"
                label="Email"
                defaultValue={user.email}
                inputRef={userEmailRef}
                type="text"
              />
              <TextField
                disabled={!btnEdit}
                id="outlined-disabled"
                label="Data de Registo"
                defaultValue={user.createdString.substring(0, 10)}
                type="text"
              />
              <TextField
                disabled={!btnEdit}
                id="outlined-disabled"
                label="Telemóvel"
                defaultValue={user.phone}
                inputRef={userPhoneRef}
                type="text"
              />
              <TextField
                disabled={!btnEdit}
                id="outlined-disabled"
                label="NIF"
                defaultValue={user.nif}
                inputRef={userNifRef}
                type="text"
              />
              <TextField
                disabled={!btnEdit}
                id="select-role"
                select
                label="Role"
                defaultValue={user.role.name}
                variant="filled"
                inputRef={userRoleRef}
                type="text"
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="Bloqueado"
              />
              {checked ? (
                <TextField
                  id="outlined-disabled"
                  label="Justificação"
                  defaultValue={user.blockedReason}
                  multiline
                  rows={2}
                  className="profileSpan2"
                  inputRef={userBlockedReasonRef}
                />
              ) : null}
              <Button
                onClick={toggleEdit}
                variant="contained"
                style={{ backgroundColor: "#021627" }}
              >
                Editar
              </Button>
              <Button
                onClick={toggleSave}
                variant="contained"
                style={{ backgroundColor: "#021627" }}
              >
                Guardar
              </Button>
              <Popper id={idPopper} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                  The content of the Popper.
                </Box>
              </Popper>
            </div>
          </CardComponent>
        </div>

        <div className="profileSpan2">
          <CardComponent
            width="100%"
            height="100%"
            col="#333333"
            fontCol="#333333"
            name="Status"
            icon={PersonIcon}
          >
            <div className="rightCard">
              <div className="rightCardTop">
                {user.image === "" ? (
                  <img
                    src={user.image}
                    alt="profile"
                    className="profilePicture"
                  />
                ) : (
                  <img
                    src="https://www.promoview.com.br/uploads/images/unnamed%2819%29.png"
                    alt="profile"
                    className="profilePicture"
                  />
                )}
              </div>

              <div className="rightCardBot">
                {user.role.name === "DEFAULT" ||
                user.role.name === "BUSINESS" ? (
                  <>
                    {isOnline() ? (
                      <span
                        style={{
                          color: "green",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ alignItems: "center", display: "flex" }}>
                          <CircleIcon style={{ marginRight: "4px" }} />
                          Online
                        </span>

                        <Button>Adicionar Fundos</Button>
                        <a href={`/extrato/${user.id}`} target="_blank">
                          <Button>Extrato</Button>
                        </a>
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#9B2226",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CircleIcon style={{ marginRight: "4px" }} />
                          <span>Offline</span>
                        </div>

                        <p style={{ color: "black" }}>
                          Ultima vez online: {lastTimeOnline}
                        </p>
                        <br />
                        <Button>Adicionar Fundos</Button>
                        <a href={`/extrato/${user.id}`} target="_blank">
                          <Button>Extrato</Button>
                        </a>
                      </span>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </CardComponent>
        </div>

        <div className="profileSpan"></div>
      </div>
    </>
  );
}

export default UserInfo;
