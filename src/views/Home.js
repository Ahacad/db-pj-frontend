import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showErrorSnackbar } from "actions";
import { useState } from "react";
import { Button, Tabs, Tab, AppBar } from "@material-ui/core";
import Card from "components/Card";
import ReplyCard from "components/ReplyCard";
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

function TabPanel(props) {
  const login = useSelector((state) => state.login);
  const { value, index } = props;
  if (value === index && index === 0) {
    return (
      <>
        {/*login.posts.map((post) => (
          <Card post={post} />
        ))*/}
      </>
    );
  } else if (value === index && index === 1) {
    return <>REPLIES</>;
  } else {
    return <>POSTS</>;
  }
}

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const login = useSelector((state) => state.login);
  const [value, setValue] = useState(0);
  if (!login.loggedin) {
    dispatch(showErrorSnackbar("登录后才有信息哦"));
  }
  const handleChange = (ev, newValue) => {
    setValue(newValue);
  };
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
          <div className="mt-4">
            <Tabs
              aria-label="simple tabs example"
              value={value}
              onChange={handleChange}
            >
              <Tab label="Posts" />
              <Tab label="Replies" />
            </Tabs>
            <TabPanel index={0} value={value}>
              Posts
            </TabPanel>
            <TabPanel index={1} value={value}>
              Replies
            </TabPanel>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
