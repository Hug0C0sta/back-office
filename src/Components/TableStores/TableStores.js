import React, { useEffect, useState } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function TableStores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getAllStores();
  }, []);

  const getAllStores = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZHJlYW1zQGR3cy5jb20iLCJpYXQiOjE2ODQ3Njk4OTQsImV4cCI6MTY4NzM2MTg5NH0.FQ3SgqLlF1d1TGuW1etyVUe51aMPzF2Tqnxcyw1KYLg";

    try {
      const response = await axios.get("http://localhost:8080/api/v1/stores", {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setStores(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{ height: "auto", width: "auto" }}
      >
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: "#005f73" }}>
            <TableRow>
              <TableCell
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Lojas
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store, index) => (
              <TableRow key={index}>
                <TableCell>{store.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
