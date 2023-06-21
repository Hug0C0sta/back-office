import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { green, red } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";

export default function TableComponent(props) {
  const { height, width, data } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const useCustomNavigate = () => {
    const navigate = useNavigate();

    const handleNavigate = (userId) => {
      navigate(`/users/edit/${userId}`);
    };

    return handleNavigate;
  };

  // Usage:
  const handleEdit = useCustomNavigate();

  const handleClick = (userId) => {
    handleEdit(userId);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  return (
    <TableContainer component={Paper} style={{ height, width }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {data.length > 0 &&
              Object.keys(data[0]).map((header) => {
                if (header !== "id") {
                  return (
                    <TableCell key={header} style={{ minWidth: 170 }}>
                      {header}
                    </TableCell>
                  );
                }
                return null;
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedData.map((row, rowIndex) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
              {Object.entries(row).map(([key, value], cellIndex) => {
                if (key !== "id") {
                  return (
                    <TableCell key={cellIndex}>
                      {typeof value === "boolean" ? (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: value ? green[500] : red[500],
                          }}
                        >
                          {value ? (
                            <CheckIcon style={{ marginRight: "4px" }} />
                          ) : (
                            <ClearIcon style={{ marginRight: "4px" }} />
                          )}
                        </span>
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                }
                return null;
              })}
              {props.editable === "true" && (
                <TableCell>
                  <EditIcon
                    style={{ color: "#005F73", marginRight: "6px" }}
                    variant="outlined"
                    onClick={() => handleClick(row.id)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
