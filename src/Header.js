import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { logoutAction } from "actions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import { StylesProvider } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  textField: {
    color: "red",
    borderColor: "red",
    borderWidth: "2px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  notchedOutline: {
    borderColor: "white ",
  },
  input: {
    color: "white",
  },
}));

function Header() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (ev) => {
    setAnchorEl(ev.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = (ev) => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const posts = useSelector((state) => state.posts);
  const [searchText, setSearchText] = useState("");
  //const handleSearchChange = (ev) => {
  //ev.preventDefault();
  //console.log(ev.target.value);
  //};

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

            <div>
              <Autocomplete
                id="combo-box-demo"
                options={posts}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderOption={(option) => (
                  <div
                    onClick={() => {
                      history.push(`/post/${option.id}`);
                    }}
                  >
                    {option.title}
                  </div>
                )}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      style={{
                        height: 40,
                        padding: 5,
                        color: "black",
                        borderRadius: 5,
                      }}
                      type="text"
                      autoComplete="false"
                      placeholder="搜索 ..."
                      {...params.inputProps}
                    />
                  </div>
                )}
              />
            </div>

            {login.loggedin && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {login.userType === 0 && (
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
                  <MenuItem
                    onClick={() => {
                      history.replace("/home");
                      handleClose();
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      dispatch(logoutAction());
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

export default Header;
