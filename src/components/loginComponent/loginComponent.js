import { TextField, Container, Box, Button } from "@mui/material";
import { useNavigate } from "react-router";

function LoginComponent({
  userDetail,
  handleInputChange,
  handleSumitData,
  handleDeleteUser,
}) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xs">
      <h1>Login</h1>
      <Box mb={2}>
        <TextField
          label="User"
          name="user"
          onChange={() => null}
          fullWidth
          autoFocus
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={() => null}
          fullWidth
        />
      </Box>

      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Entrar
        </Button>
      </Box>
    </Container>
  );
}

export default LoginComponent;
