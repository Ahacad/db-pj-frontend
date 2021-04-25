import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { showSuccessSnackbar, showErrorSnackbar } from "actions/snackbar";
import { loginAction } from "actions";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  mt1: {
    marginTop: "1rem",
  },
  mt3: {
    marginTop: "3rem",
  },
}));

export default function Login() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [registerinfo, setRegisterinfo] = useState({
    name: "",
    email: "",
    password: "",
    verification: "",
  });
  const handleChange = (ev) => {
    if (ev.target.id === "form-password") {
      setRegisterinfo({ ...registerinfo, password: ev.target.value });
    } else if (ev.target.id === "form-verification") {
      setRegisterinfo({ ...registerinfo, verification: ev.target.value });
    } else if (ev.target.id === "form-email") {
      setRegisterinfo({ ...registerinfo, email: ev.target.value });
    } else if (ev.target.id === "form-name") {
      setRegisterinfo({ ...registerinfo, name: ev.target.value });
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    // verify input
    if (
      !registerinfo.name ||
      !registerinfo.password ||
      !registerinfo.verification ||
      !registerinfo.email
    ) {
      dispatch(showErrorSnackbar("注册信息不能为空！"));
      return;
    }
    if (registerinfo.password !== registerinfo.verification) {
      dispatch(showErrorSnackbar("两次输入的密码需要相同！"));
      return;
    }
    if (!/\w+@\w+\.\w+/.test(registerinfo.email)) {
      dispatch(showErrorSnackbar("邮箱格式不正确！"));
      return;
    }
    // send request
    axios
      .post("https://localhost:4000/users/register", {
        name: registerinfo.name,
        password: registerinfo.password,
        email: registerinfo.email,
      })
      .then((resp) => {
        if (resp.status === 201) {
          const { id } = resp.data;
          setRegisterinfo({
            name: "",
            email: "",
            password: "",
            verification: "",
          });
          dispatch(loginAction(id));
          history.replace("/");
          dispatch(showSuccessSnackbar("注册成功"));
        }
      });
  };
  return (
    <div className="flex flex-col m-auto mt-40 w-72">
      <TextField required id="form-name" label="昵称" onChange={handleChange} />
      <TextField
        required
        id="form-email"
        label="邮箱"
        onChange={handleChange}
      />
      <TextField
        required
        id="form-password"
        onChange={handleChange}
        label="密码"
        type="password"
      />
      <TextField
        required
        id="form-verification"
        onChange={handleChange}
        label="再次输入密码"
        type="password"
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.mt3}
        onClick={handleSubmit}
      >
        注册
      </Button>
    </div>
  );
}
