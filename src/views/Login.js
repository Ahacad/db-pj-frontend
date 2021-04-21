import { TextField, Button, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { loginAction } from "actions";
import { connect } from "react-redux";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  mt1: {
    marginTop: "1rem",
  },
  mt3: {
    marginTop: "3rem",
  },
}));

function Login(props) {
  const classes = useStyles();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const message1 = "请输入正确的邮箱格式";
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: message1,
  });
  const { open, vertical, horizontal } = snackbar;
  const handleChange = (ev) => {
    switch (ev.target.type) {
      case "text":
        setMail(ev.target.value);
        break;
      case "password":
        setPassword(ev.target.value);
        break;
      default:
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!/\w+@\w+\.\w+/.test(mail)) {
      setSnackbar({ ...snackbar, open: true });
      return;
    }
    axios
      .post("https://localhost:4000/users/login", {
        email: mail,
        password,
      })
      .then((resp) => {
        console.log(resp);
        const { id, name } = resp.data;
        if (resp.status === 200) {
          props.login(id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        key={vertical + horizontal}
      />

      <div className="flex flex-col m-auto mt-40 w-72">
        <TextField
          required
          id="form-name"
          label="邮箱"
          onChange={handleChange}
        />
        <TextField
          required
          id="form-password"
          label="密码"
          type="password"
          autoComplete="current-password"
          className={classes.mt1}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.mt3}
          onClick={handleSubmit}
        >
          登录
        </Button>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    value: state,
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    login: (id) => dispatch(loginAction(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
