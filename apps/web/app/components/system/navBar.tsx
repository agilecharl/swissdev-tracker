import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SwissDev Tracker
        </Typography>
        <Box>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="/projects">
            Projects
          </Button>
          <Button color="inherit" href="/about">
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
