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
} from "@mui/material";

let headers = [
  { id: "first-name", value: "nombre" },
  { id: "last-name", value: "apellido" },
  { id: "email", value: "email" },
  { id: "actions", value: "" },
];

function UsersListDataTable({ usersListData }) {
  const navigate = useNavigate();

  function handleClick(userId) {
    navigate(`/users/${userId}`);
  }

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
            {usersListData.map(
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
      </TableContainer>
    </>
  );
}

export default UsersListDataTable;