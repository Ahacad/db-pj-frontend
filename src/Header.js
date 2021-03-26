import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export default function Header(props) {
  return (
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
          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
          <Button color="inherit">Home</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
