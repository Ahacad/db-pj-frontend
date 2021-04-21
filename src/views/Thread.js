import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ReplyCard from "components/ReplyCard";
import EditIcon from "@material-ui/icons/Edit";
import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

function Thread(props) {
  const classes = useStyles();
  const post = {
    title: "TESTING TITLe",
    content: "TESTINGCONTENTTESTINGCONTENT",
    likecount: 30,
  };
  const replies = [{}, {}, {}];
  return (
    <div className="mt-2 sm:w-190 Main mx-auto">
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
        <ReplyCard />
      ))}
      <Fab color="secondary" className={classes.fab}>
        <EditIcon />
      </Fab>
    </div>
  );
}

export default Thread;
