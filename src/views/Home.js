import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showErrorSnackbar } from "actions";
import { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

function Bio(props) {
  const { login } = props;
  const [editShow, setEditShow] = useState(false);
  const [bio, setBio] = useState("");
  const handleEditShow = () => {
    setBio(login.bio);
    setEditShow(true);
  };
  const handleInput = (ev) => {
    setBio(ev.target.value);
  };
  const handleEditBio = () => {
    // TODO
  };
  if (editShow) {
    return (
      <div className="mt-2 text-lg text-gray-500">
        <input onChange={handleInput} value={bio} />
        <Button
          type="primary"
          variant="outlined"
          className="ml-2"
          onClick={handleEditBio}
        >
          发送
        </Button>
      </div>
    );
  } else {
    return (
      <div
        className="mt-2 text-lg text-gray-500"
        onDoubleClick={handleEditShow}
      >
        {login.bio || "这个人很懒，什么也没有留下。。。"}
      </div>
    );
  }
}

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const login = useSelector((state) => state.login);
  if (!login.loggedin) {
    dispatch(showErrorSnackbar("登录后才有信息哦"));
  }
  return (
    <div>
      {login.loggedin && (
        <div className="flex flex-col items-center justify-center w-full mt-4 rounded-full">
          <img
            src={`https://picsum.photos/seed/home/80/80`}
            alt="head"
            className="w-16 h-16"
          />
          <div className="mt-2 text-2xl font-bold">{login.username}</div>
          <Bio login={login} />
        </div>
      )}
    </div>
  );
}

export default Home;
