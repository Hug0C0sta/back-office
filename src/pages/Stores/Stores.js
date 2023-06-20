import CardComponent from "../../Components/Card/CardComponent";
import TableStores from "../../Components/TableStores/TableStores";
import MapIcon from "@mui/icons-material/Map";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import "./styles.css";
import L from "leaflet";
import axios from "axios";
import { Box, Button, MenuItem, Popper, TextField } from "@mui/material";

const iconSize = [20, 32];

const icon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: iconSize,
});

function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getAllStores();
  }, []);

  const getAllStores = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8080/api/v1/stores", {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      setStores(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:8080/api/v1/users`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [newStore, setNewStore] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [popperText, setPopperText] = useState("");
  const [popperColor, setPopperColor] = useState("primary.main");

  const handleClickAddStore = async () => {
    const storeNameValue = storeNameRef.current.value;
    const storeLatValue = storeLatRef.current.value;
    const storeLongValue = storeLongRef.current.value;
    const storeClientValue = storeClientRef.current.value;

    if (
      !storeNameValue ||
      !storeLatValue ||
      !storeLongValue ||
      !storeClientValue
    ) {
      setPopperText("Preencha todos os campos!");
      setPopperColor("error.main");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
      return;
    }

    const token = localStorage.getItem("token");

    const newStoreData = {
      name: storeNameValue,
      latitude: storeLatValue,
      longitude: storeLongValue,
      businessId: storeClientValue,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/stores`,
        newStoreData,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpen(true);
      setPopperText("Loja adicionada com sucesso!");
      setPopperColor("success.main");
      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
      setOpen(true);
      setPopperText("Ocorreu um erro ao adicionar a loja.");
      setPopperColor("error.main");
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  };

  const storeNameRef = useRef("");
  const storeLatRef = useRef("");
  const storeLongRef = useRef("");
  const storeClientRef = useRef("");

  return (
    <>
      <div className="containerStores">
        <div className="storesSpan3">
          <CardComponent
            width="100%"
            height="80%"
            col="#333333"
            fontCol="#333333"
            name="Mapa"
            icon={MapIcon}
          >
            <MapContainer
              center={[37.752648359600805, -9.184699058532715]}
              zoom={6}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "calc(100vh - 4rem)" }}
            >
              <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {stores.map((store) => (
                <Marker
                  key={store.id}
                  position={[store.latitude, store.longitude]}
                  icon={icon}
                >
                  <Popup>{store.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardComponent>
        </div>
        <div className="storesSpan2">
          <CardComponent
            width="100%"
            height="80%"
            col="#333333"
            fontCol="#333333"
            name="Lojas"
            icon={StoreIcon}
          >
            <TableStores stores={stores} />
          </CardComponent>
        </div>
        <div className="storesSpan1">
          <CardComponent
            width="100%"
            height="fit-content"
            col="#333333"
            fontCol="#333333"
            name="Adicionar Loja"
            icon={AddBusinessIcon}
          >
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-disabled"
                  label="Nome"
                  type="text"
                  className="storeInputText2"
                  inputRef={storeNameRef}
                />
                <TextField
                  label="Latitude"
                  type="text"
                  className="storeInputText1"
                  inputRef={storeLatRef}
                />
                <TextField
                  label="Longitude"
                  type="text"
                  className="storeInputText1"
                  inputRef={storeLongRef}
                />
              </div>
              <div>
                <TextField
                  select
                  label="Utilizador"
                  variant="filled"
                  type="text"
                  inputRef={storeClientRef}
                >
                  {users.map((user) => {
                    if (user.role.name === "BUSINESS") {
                      return (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      );
                    }
                    return null;
                  })}
                </TextField>
              </div>
              <div>
                <Button
                  variant="contained"
                  onClick={handleClickAddStore}
                  size="large"
                  sx={{
                    width: "100%",
                    backgroundColor: "#333333",
                    color: "#ffffff",
                    marginTop: "1rem",
                  }}
                >
                  Adicionar Loja
                </Button>
              </div>
              <Popper
                open={open}
                anchorEl={anchorEl}
                placement="top"
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 9999,
                }}
              >
                <Box
                  sx={{
                    bgcolor: popperColor,
                    color: "#ffffff",
                    p: 2,
                  }}
                >
                  {popperText}
                </Box>
              </Popper>
            </Box>
          </CardComponent>
        </div>
      </div>
    </>
  );
}

export default Stores;
