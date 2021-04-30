import { TextField, Button, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { loginAction, updateLikedRepliesAction } from "actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessSnackbar, showErrorSnackbar } from "actions/snackbar";
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
  const history = useHistory();
  const login = useSelector((state) => state.login);
  const classes = useStyles();
  const dispatch = useDispatch();
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
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!/\w+@\w+\.\w+/.test(mail)) {
      setSnackbar({ ...snackbar, open: true });
      return;
    }
    await axios
      .post("https://localhost:4000/users/login", {
        email: mail,
        password,
      })
      .then((resp) => {
        if (resp.status === 200) {
          const { bio, name: username, id, user_type: userType } = resp.data;
          console.log(resp);
          dispatch(loginAction(id, bio, username, userType));
          dispatch(showSuccessSnackbar("登录成功"));
          history.replace("/");
          return id;
        }
      })
      .catch((err) => {
        console.log(err);
        // TODO: more detailed error handler for 404 and 403
        dispatch(
          showErrorSnackbar("登录失败，请确认已经注册并且邮箱密码正确！")
        );
      });
    axios
      .get(`https://localhost:4000/users/${login.id}/replylikes`)
      .then((resp) => resp.data)
      .then((replies) => {
        dispatch(updateLikedRepliesAction(replies));
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

export default Login;
