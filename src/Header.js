import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Header(props) {
  return (
    <>
      <div className="flex flex-grow">
        <AppBar position="static">
          <Toolbar className="flex">
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
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
