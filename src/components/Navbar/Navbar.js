
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "@mui/material/Link";
import './Navbar.css'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const {
    isAuthenticated,
    user,
    logout,
  } = useAuth0()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {    
    setAnchorEl(null);
  };

  return (

        <Toolbar sx={{color: 'secondary.main'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 5 }}
          >
            <AdbIcon />
          </IconButton>
          <Link href="#" color="inherit" underline="none" sx={{ mr: 5 }}>
            {"Find Friends"}
          </Link>
          <Link href={'/meetups'} color="inherit" underline="none" sx={{ flexGrow: 1 }}>
            {"Find Meetup Spots"}
          </Link>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button"
            }}
          >
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>

  );
}
