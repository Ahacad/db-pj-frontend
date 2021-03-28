import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mt1: {
    marginTop: "1rem",
  },
  mt3: {
    marginTop: "3rem",
  },
}));

export default function Login() {
  const classes = useStyles();
  return (
    <div className="m-auto flex flex-col w-72 mt-40">
      <TextField required id="form-name" label="昵称" />
      <TextField
        required
        id="form-password"
        label="密码"
        type="password"
        autoComplete="current-password"
        className={classes.mt1}
      />
      <Button variant="contained" color="primary" className={classes.mt3}>
        登录
      </Button>
    </div>
  );
}
