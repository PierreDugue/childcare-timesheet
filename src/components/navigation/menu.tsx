import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router";
import { LogoutButton } from "../authentication/logout";

export function Menu() {
  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between">
        <Box className="flex gap-2">
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/settings"
          >
            Details
          </Button>
        </Box>
        <Box>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
