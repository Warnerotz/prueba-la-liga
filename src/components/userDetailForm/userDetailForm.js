import { TextField, Container, Box, Button } from "@mui/material";
import { StyledBox, LogOutBox } from "./userDetailForm.styles";

function UserDetailForm({
  userDetail,
  handleInputChange,
  handleSumitData,
  handleDeleteUser,
  handleLogOut,
  handleGoBack,
}) {
  return (
    <Container maxWidth="xs">
      <h1>datos de usuario</h1>
      <Box mb={2}>
        <TextField
          label="Nombre"
          name="first_name"
          defaultValue={userDetail.first_name}
          onChange={handleInputChange}
          fullWidth
          autoFocus
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Apellido"
          name="last_name"
          defaultValue={userDetail.last_name}
          onChange={handleInputChange}
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Email"
          name="email"
          defaultValue={userDetail.email}
          onChange={handleInputChange}
          fullWidth
        />
      </Box>
      <StyledBox>
        <Button variant="contained" color="success" onClick={handleSumitData}>
          Actualizar
        </Button>

        <Button variant="contained" color="error" onClick={handleDeleteUser}>
          Borrar
        </Button>

        <Button variant="contained" color="info" onClick={handleGoBack}>
          Volver
        </Button>
      </StyledBox>

      <LogOutBox pt={2}>
        <Button variant="contained" color="warning" onClick={handleLogOut}>
          Desloguearse
        </Button>
      </LogOutBox>
    </Container>
  );
}

export default UserDetailForm;
