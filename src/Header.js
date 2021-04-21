import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { logoutAction } from "actions";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (ev) => {
    setAnchorEl(ev.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = (ev) => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="flex flex-grow">
        <AppBar position="static">
          <Toolbar className="flex justify-between">
            <div className="">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className="flex-1"
              >
                <MenuIcon />
              </IconButton>
              <Button color="inherit">
                <Link to="/">Main</Link>
              </Button>
              <Button color="inherit">
                <Link to="/login">Login</Link>
              </Button>
              <Button color="inherit">
                <Link to="/register">Register</Link>
              </Button>
              <Button color="inherit">
                <Link to="/home">Home</Link>
              </Button>
            </div>

            {props.value.loggedin && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {props.value.id === 0 && (
                    <div className="mr-2 text-base">Admin</div>
                  )}
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      props.logout();
                    }}
                  >
                    Sign out
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    value: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
