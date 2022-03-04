import { TextField, Container, Box, Button } from "@mui/material";

function UserDetailForm({
  userDetail,
  handleInputChange,
  setShouldOpenConfirmationModal,
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
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShouldOpenConfirmationModal(true)}
        >
          Actualizar
        </Button>

        <Button variant="contained" color="warning">
          Cancelar
        </Button>
      </Box>
    </Container>
  );
}

export default UserDetailForm;
