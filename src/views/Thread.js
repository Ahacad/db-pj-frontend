import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import ReplyCard from "components/ReplyCard";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";
import { Fab, Slide, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GlobalSnackbar from "components/GlobalSnackbar";
import { showSuccessSnackbar, showErrorSnackbar } from "actions/snackbar";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

function Thread(props) {
  const params = useParams();
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [editorOpened, setEditorOpened] = useState(false);
  const [newreply, setNewreply] = useState({ content: "" });
  const [post, setPost] = useState({ title: "", content: "", likecount: 0 });
  const [replies, setReplies] = useState([]);
  const toggleEditor = () => {
    editorOpened === true ? setEditorOpened(false) : setEditorOpened(true);
  };
  const fetchThread = async () => {
    axios
      .get(`https://localhost:4000/posts/${params.id}`)
      .then((resp) => resp.data)
      .then((data) => {
        const post = data[0];
        setPost({
          title: post.title,
          content: post.content,
          likecount: post.likecount,
        });
        console.log(data.slice(1));
        setReplies(data.slice(1));
      })
      .catch((err) => console.error(err));
  };
  const handleSendNewreply = () => {
    if (newreply.content === "") {
      dispatch(showErrorSnackbar("请输入文字后发布"));
      return;
    }
    if (!login.loggedin) {
      dispatch(showErrorSnackbar("登录后才可以发布！"));
      return;
    }
    axios
      .post(`https://localhost:4000/posts/${params.id}/newreply`, {
        userId: login.id,
        content: newreply.content,
      })
      .then((resp) => {
        if (resp.status === 201) {
          dispatch(showSuccessSnackbar("发布成功"));
          setNewreply({ content: "" });
          fetchThread();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleNewreplyContent = (ev) => {
    ev.preventDefault();
    setNewreply({ ...newreply, content: ev.target.value });
  };
  useEffect(() => {
    fetchThread();
  }, [params]);
  return (
    <div className="mx-auto mt-2 sm:w-190 Main">
      <div className="pb-4 border-b-2 border-gray-200">
        <div className="flex mb-2 min-h-10">
          <img
            className="w-10 ml-2 mr-2"
            src={`https://picsum.photos/seed/${Math.floor(
              Math.random() * 1000
            )}/40/40`}
            alt="head"
          />
          <div className="flex-grow pt-1 text-lg font-bold text-left">
            {post.title}
          </div>
        </div>
        <div className="p-2 text-left">{post.content}</div>
        <div className="text-right">
          <div className="inline-block mr-1 text-gray-600">
            {post.likecount}
          </div>

          <div className="inline-block mr-2 text-gray-600 cursor-pointer">
            <FavoriteBorderIcon />
          </div>
          <div className="inline-block text-gray-600 cursor-pointer">
            <ShareIcon />
          </div>
        </div>
      </div>
      {replies.map((reply) => (
        <ReplyCard
          reply={reply}
          key={reply.id}
          fetchThread={fetchThread}
          setReplies={setReplies}
          replies={replies}
          toggleEditor={toggleEditor}
        />
      ))}
      <Fab color="secondary" className={classes.fab} onClick={toggleEditor}>
        <EditIcon />
      </Fab>

      <Slide direction="up" in={editorOpened}>
        <div className="fixed bg-white border-2 bottom-4 left-2">
          <div className="text-right">
            <IconButton
              edge="start"
              color="primary"
              aria-label="menu"
              onClick={handleSendNewreply}
            >
              <SendIcon />
            </IconButton>
          </div>
          <textarea
            id="editor"
            value={newreply.content}
            rows="5"
            cols="50"
            onChange={handleNewreplyContent}
            className="p-4 border-2"
          ></textarea>
        </div>
      </Slide>
      <GlobalSnackbar />
    </div>
  );
}

export default Thread;
