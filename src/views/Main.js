import Card from "components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { TextField, IconButton } from "@material-ui/core";
import { Fab, Slide } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { showSuccessSnackbar, showErrorSnackbar } from "actions/snackbar";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

function Main() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.id);

  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [newpost, setNewpost] = useState({ title: "", content: "" });
  const [editorOpened, setEditorOpened] = useState(false);
  const handleNewpostContent = (ev) => {
    ev.preventDefault();
    setNewpost({ ...newpost, content: ev.target.value });
  };
  const handleNewpostTitle = (ev) => {
    ev.preventDefault();
    setNewpost({ ...newpost, title: ev.target.value });
  };
  const handleSendNewpost = () => {
    if (newpost.title === "" || newpost.content === "") {
      dispatch(showErrorSnackbar("请输入文字后发布"));
      return;
    }
    axios
      .post("https://localhost:4000/posts/new", {
        userId,
        title: newpost.title,
        content: newpost.content,
      })
      .then((resp) => {
        if (resp.status === 201) {
          dispatch(showSuccessSnackbar("成功发布"));
          setNewpost({ title: "", content: "" });
          fetchData();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fetchData = async () => {
    axios
      .get("https://localhost:4000/posts")
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleClickPost = (id) => {
    history.push(`/post/${id}`);
  };
  return (
    <>
      <div className="mx-auto mt-2 sm:w-152">
        {[...posts].reverse().map((post) => (
          <Card
            post={post}
            key={post.id}
            handleClick={() => handleClickPost(post.id)}
          />
        ))}
      </div>

      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => {
          editorOpened === true
            ? setEditorOpened(false)
            : setEditorOpened(true);
        }}
      >
        <AddIcon />
      </Fab>

      <Slide direction="up" in={editorOpened}>
        <div className="fixed bg-white border-2 bottom-4 left-2">
          <div className="flex justify-between mb-2">
            <div className="text-left">
              <TextField
                id="title"
                label="title"
                variant="outlined"
                value={newpost.title}
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
            value={newpost.content}
            rows="5"
            cols="50"
            onChange={handleNewpostContent}
            className="p-4 border-2"
          ></textarea>
        </div>
      </Slide>
    </>
  );
}

export default Main;
