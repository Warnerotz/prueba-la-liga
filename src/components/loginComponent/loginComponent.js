import { TextField, Container, Box, Button } from "@mui/material";

function LoginComponent({ handleInputChange, handleSumitData }) {
  return (
    <Container maxWidth="xs">
      <h1>Login</h1>
      <Box mb={2}>
        <TextField
          label="Email"
          name="email"
          onChange={handleInputChange}
          fullWidth
          autoFocus
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={handleInputChange}
          fullWidth
        />
      </Box>

      <Box>
        <Button variant="contained" color="primary" onClick={handleSumitData}>
          Entrar
        </Button>
      </Box>
    </Container>
  );
}

export default LoginComponent;
