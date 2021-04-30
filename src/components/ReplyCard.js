import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  LinkedinIcon,
  TwitterIcon,
  RedditIcon,
  PinterestIcon,
  TelegramIcon,
  FacebookIcon,
  PocketIcon,
  WhatsappIcon,
} from "react-share";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import {
  updateLikedRepliesAction,
  showSuccessSnackbar,
  showErrorSnackbar,
} from "actions";
import ReactMarkdown from "react-markdown";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

const shareIcons = (
  <>
    <EmailShareButton>
      <EmailIcon round size={48} />
    </EmailShareButton>
    <LinkedinShareButton>
      <LinkedinIcon round size={48} />
    </LinkedinShareButton>
    <TwitterShareButton>
      <TwitterIcon round size={48} />
    </TwitterShareButton>
    <RedditShareButton>
      <RedditIcon round size={48} />
    </RedditShareButton>
    <PinterestShareButton>
      <PinterestIcon round size={48} />
    </PinterestShareButton>
    <TelegramShareButton>
      <TelegramIcon round size={48} />
    </TelegramShareButton>
    <FacebookShareButton>
      <FacebookIcon round size={48} />
    </FacebookShareButton>
    <PocketShareButton>
      <PocketIcon round size={48} />
    </PocketShareButton>
    <WhatsappShareButton>
      <WhatsappIcon round size={48} />
    </WhatsappShareButton>
  </>
);

function ReplyCard(props) {
  const { fetchThread, reply, replies, setReplies, toggleEditor } = props;
  // TODO: like
  const [like, setLike] = useState({ liked: false, liking: false });
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const [deleteDialogOpened, setDeleteDialogOpened] = useState(false);
  const [shareDialogOpened, setShareDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todeleteReplyId, setTodeleteReplyId] = useState(-1);

  const syncReplyLikes = () => {
    axios
      .get(`https://localhost:4000/users/${login.id}/replylikes`)
      .then((resp) => {
        return resp.data;
      })
      .then((replies) => {
        dispatch(updateLikedRepliesAction(replies));
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteReply = () => {
    axios
      .post(`https://localhost:4000/posts/${reply.post_id}/delete`, {
        replyId: reply.id,
      })
      .then(() => {
        dispatch(showSuccessSnackbar("成功删除！"));
      });
    setDeleteDialogOpened(false);
    setReplies(
      replies.filter((reply) => {
        if (reply.id !== todeleteReplyId) {
          return reply;
        }
      })
    );
  };
  const handleLike = () => {
    setIsLoading(true);
    axios
      .post(`https://localhost:4000/posts/${reply.post_id}/reply/like`, {
        userId: login.id,
        replyId: reply.id,
      })
      .then(async (resp) => {
        if (resp.status === 200) {
          await syncReplyLikes();
          fetchThread();
        }
      });
    setIsLoading(false);
  };
  const handleUnlike = () => {
    setIsLoading(true);
    axios
      .post(`https://localhost:4000/posts/${reply.post_id}/reply/unlike`, {
        userId: login.id,
        replyId: reply.id,
      })
      .then(async (resp) => {
        if (resp.status === 200) {
          await syncReplyLikes();
          fetchThread();
        }
      });
    setIsLoading(false);
  };
  return (
    <div className="flex p-2 mt-1 border-b-2 border-gray-200">
      <div className="flex-shrink-0 w-10">
        <img
          src={`https://picsum.photos/seed/${Math.floor(
            Math.random() * 1000
          )}/40/40`}
          alt="head"
        />
      </div>
      <div className="relative flex-grow pl-2 text-left">
        <div className="mb-2">{reply.name}</div>
        <div className="min-h-36">
          <ReactMarkdown>{reply.content}</ReactMarkdown>
        </div>
        <div className="mt-2 text-right">
          <div className="inline-block text-gray-600">{reply.likecount}</div>
          <div className="inline-block ml-1 text-gray-600 cursor-pointer">
            {isLoading ? (
              <CircularProgress size={15} />
            ) : login.likedReplies.findIndex((ele) => ele === reply.id) !==
              -1 ? (
              <div className="text-red-600" onClick={handleUnlike}>
                <FavoriteIcon />
              </div>
            ) : (
              <div onClick={handleLike}>
                <FavoriteBorderIcon />
              </div>
            )}
          </div>
          <div
            className="inline-block ml-2 text-gray-600 cursor-pointer"
            onClick={() => {
              setShareDialogOpened(!shareDialogOpened);
            }}
          >
            <ShareIcon />
          </div>
          {reply.userid === login.id && (
            <div
              className="inline-block ml-2 text-gray-600 cursor-pointer"
              onClick={toggleEditor}
            >
              <EditIcon />
            </div>
          )}
          {(login.userType === 0 || reply.userid === login.id) && (
            <div
              className="inline-block ml-2 text-gray-600 cursor-pointer"
              onClick={() => {
                setTodeleteReplyId(reply.id);
                setDeleteDialogOpened(true);
              }}
            >
              <DeleteIcon />
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={deleteDialogOpened}
        onClose={() => setDeleteDialogOpened(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">确定要删除？</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            本操作不可逆！
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setDeleteDialogOpened(false)}>
            还是算了
          </Button>
          <Button color="secondary" autoFocus onClick={handleDeleteReply}>
            确定
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={shareDialogOpened}
        onClose={() => setShareDialogOpened(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">分享</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {shareIcons}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" autoFocus onClick={handleDeleteReply}>
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ReplyCard;
