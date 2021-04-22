import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
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
import {
  showSuccessSnackbar,
  clearSnackbar,
  showErrorSnackbar,
} from "actions/snackbar";
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
  const userId = useSelector((state) => state.login.id);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [editorOpened, setEditorOpened] = useState(false);
  const [newreply, setNewreply] = useState({ content: "" });
  const [post, setPost] = useState({ title: "", content: "", likecount: 0 });
  const [replies, setReplies] = useState([]);
  const fetchThread = async () => {
    axios
      .get(`https://localhost:4000/posts/${params.id}`)
      .then((resp) => resp.data)
      .then((data) => {
        console.log(data);
        const post = data[0];
        setPost({
          title: post.title,
          content: post.content,
          likecount: post.likecount,
        });
        setReplies(data.slice(1));
      });
  };
  const handleSendNewreply = () => {
    if (newreply.content === "") {
      dispatch(showErrorSnackbar("请输入文字后发布"));
      return;
    }
    axios
      .post(`https://localhost:4000/posts/${params.id}/newreply`, {
        userId,
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
  }, []);
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

          <div className="inline-block mr-2 text-gray-600">
            <FavoriteBorderIcon />
          </div>
          <div className="inline-block text-gray-600">
            <ShareIcon />
          </div>
        </div>
      </div>
      {replies.map((reply) => (
        <ReplyCard reply={reply} key={reply.id} />
      ))}
      <Fab
        color="secondary"
        className={classes.fab}
        onClick={() => {
          editorOpened === true
            ? setEditorOpened(false)
            : setEditorOpened(true);
        }}
      >
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
