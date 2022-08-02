import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Drawer from '@mui/material/Drawer';
import { Popover, Typography, AppBar, Toolbar } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import "./Drawer.css"

const drawerWidth = 240;


export default function PermanentDrawerLeft() {

  const navigate = useNavigate()
  const [popAnchorEl, setPopAnchorEl] = React.useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [menuItem, setMenuItem] = React.useState(null)
  const [link, setLink] = React.useState(null)
  const {
    isAuthenticated,
    user,
    logout,
  } = useAuth0()
  

  const handleClick = () => {
    console.log('lets go for a ride')
    console.log(link)
    navigate(link)
  }

  const handlePopoverOpen = (event,text, link) => {
    console.log(link)
    setMenuItem(text)
    setLink(link)
    setPopAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopAnchorEl(null);
  };

  const handleMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.clear();
    logout({ returnTo: window.location.origin })
    navigate('/');
  }

  const popOpen = Boolean(popAnchorEl);
  const menuOpen = Boolean(menuAnchorEl)

  const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        id="navbar-main"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#115d3b" }}
      >
        <Toolbar>
          <Link href={"/home"} color="inherit">
            <IconButton
              // size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 5, mt: 0, pt: 0, pb: 0, mb: 0, pl:0, maxHeight: "40px" }}
            >
              <img
                src={"https://cp-pnp-bucket.s3.amazonaws.com/PnpTreeBackground.png"}
                alt="logo"
                id="navbar-logo"
              />
              {/* <AdbIcon /> */}
            </IconButton>
          </Link>
          <Link
            href={"/find-friends"}
            color="inherit"
            underline="none"
            sx={{ mr: 5 }}
          >
            {"Find Friends"}
          </Link>
          <Link
            href={"/meetups"}
            color="inherit"
            underline="none"
            sx={{ mr: 1 }}
          >
            {"Find Meetup Spots"}
          </Link>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{ ml: "auto" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={menuAnchorEl}
            open={menuOpen}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          "& .MuiDrawer-paper": {
            width: `calc(${theme.spacing(7)} + 1px)`,
            [theme.breakpoints.up("sm")]: {
              width: `calc(${theme.spacing(8)} + 1px)`,
            },
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {[
            {
              text: "Mailbox",
              value: 0,
              link: "/messages",
              icon: <MailIcon />,
            },
            {
              text: "Friends",
              value: 0,
              link: "/friends",
              icon: <PeopleAltIcon />,
            },
            {
              text: "Events",
              value: 0,
              link: "/events",
              icon: <EventAvailableIcon />,
            },
            {
              text: "Profile",
              value: 0,
              link: "/profile",
              icon: <AccountCircleIcon />,
            },
          ].map((object, index) => (
            <ListItem
              key={object.text}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                aria-owns={popOpen ? "popover_menu_open" : undefined}
                aria-haspopup="true"
                onMouseEnter={(event) => {
                  handlePopoverOpen(event, object.text, object.link);
                }}
                onMouseLeave={handlePopoverClose}
                onClick={handleClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                  }}
                >
                  {object.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            // <IconPopover object={object}/>
          ))}
        </List>
        <Popover
          id={`popover_menu_open`}
          sx={{
            pointerEvents: "none",
          }}
          open={popOpen}
          anchorEl={popAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>{menuItem}</Typography>
        </Popover>
      </Drawer>
    </Box>
  );
}
