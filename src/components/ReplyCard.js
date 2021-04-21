import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

function ReplyCard(props) {
  const mock = {
    name: "ahahahahahaha",
    content: "HAHAHHAHAHAHAHAHHAAHHA this is really really interesting!",
    likecount: 3,
  };
  return (
    <div className="flex p-2 mt-1 border-b-2 border-gray-200 min-h-48">
      <div className="w-10">
        <img
          src={`https://picsum.photos/seed/${Math.floor(
            Math.random() * 1000
          )}/40/40`}
          alt="head"
        />
      </div>
      <div className="flex-grow text-left pl-2 relative">
        <div className="mb-2">{mock.name}</div>
        <div>{mock.content}</div>
        <div className="absolute bottom-0 right-0 text-right">
          <div className="inline-block mr-1 text-gray-600">
            {mock.likecount}
          </div>

          <div className="inline-block mr-2 text-gray-600">
            <FavoriteBorderIcon />
          </div>
          <div className="inline-block text-gray-600">
            <ShareIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyCard;
