import Card from "components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme, StylesProvider } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { TextField, IconButton } from "@material-ui/core";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import SuccessSnackbar from "components/SuccessSnackbar";
import { showSuccessSnackbar, clearSnackbar } from "actions/snackbar";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

function Editor(props) {
  const { handleNewpostContent, handleNewpostTitle, handleSendNewpost } = props;
  return (
    <div className="fixed border-2 bottom-4">
      <div className="mb-2 flex justify-between">
        <div className="text-left">
          <TextField
            id="title"
            label="title"
            variant="outlined"
            onChange={handleNewpostTitle}
          />
        </div>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={handleSendNewpost}
        >
          <SendIcon />
        </IconButton>
      </div>

      <textarea
        id="editor"
        rows="5"
        cols="50"
        onChange={handleNewpostContent}
        className="p-4 border-2"
      ></textarea>
    </div>
  );
}

function Main() {
  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [newpost, setNewpost] = useState({ title: "", content: "" });
  const handleNewpostContent = (ev) => {
    ev.preventDefault();
    setNewpost({ ...newpost, content: ev.target.value });
  };
  const handleNewpostTitle = (ev) => {
    ev.preventDefault();
    setNewpost({ ...newpost, title: ev.target.value });
  };
  const handleSendNewpost = () => {
    dispatch(showSuccessSnackbar("TEST"));
    //axios.post("https://localhost:4000/posts/new", {});
    // TODO
  };
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("https://localhost:4000/posts")
        .then((resp) => {
          return resp.data;
        })
        .then((data) => {
          setPosts(data);
          console.log(data);
        });
    };
    fetchData();
  }, []);

  const handleClickPost = (id) => {
    history.push(`/post/${id}`);
  };
  return (
    <>
      <div className="mx-auto mt-2 sm:w-152">
        {posts.map((post) => (
          <Card post={post} handleClick={() => handleClickPost(post.id)} />
        ))}
      </div>

      <Fab color="primary" className={classes.fab}>
        <AddIcon />
      </Fab>
      <Editor
        handleNewpostContent={handleNewpostContent}
        handleNewpostTitle={handleNewpostTitle}
        handleSendNewpost={handleSendNewpost}
      />
      <SuccessSnackbar />
    </>
  );
}

export default Main;
