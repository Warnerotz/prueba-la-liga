import { Container, Box, Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box pt={10}>
        <h1>Ha ocurrido un Error</h1>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/")}
        >
          Volver
        </Button>
      </Box>
    </Container>
  );
}
