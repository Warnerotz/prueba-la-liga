import { HeaderText } from "./usersListDataTable.styles";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
} from "@mui/material";
import { useState } from "react";

let headers = [
  { id: "first-name", value: "nombre" },
  { id: "last-name", value: "apellido" },
  { id: "email", value: "email" },
  { id: "actions", value: "" },
];

function UsersListDataTable({ usersListData, logOut, getUsersList }) {
  const navigate = useNavigate();

  function handleClick(userId) {
    navigate(`/users/${userId}`);
  }

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  const handleChangePage = (event, newPage) => {
    getUsersList(newPage + 1);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWith: 650 }} arial-label="simple Table">
          <TableHead>
            <TableRow>
              {headers.map(({ id, value }) => (
                <TableCell data-testid={`user-list-headers-${id}`} key={id}>
                  <HeaderText>{value}</HeaderText>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersListData.data.map(
              ({ id, first_name, last_name, email }, index) => (
                <TableRow key={index} data-testid={`user-list-data-${id}`}>
                  <TableCell>{first_name}</TableCell>
                  <TableCell>{last_name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleClick(id)}>
                      Modificar
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[-1]}
          component="div"
          count={usersListData.total}
          page={usersListData.page - 1}
          rowsPerPage={usersListData.per_page}
          onPageChange={handleChangePage}
        />
      </TableContainer>
      <Box pt={2}>
        <Button variant="contained" color="warning" onClick={handleLogOut}>
          Desloguearse
        </Button>
      </Box>
    </>
  );
}

export default UsersListDataTable;
