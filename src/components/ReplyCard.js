import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";

function ReplyCard(props) {
  const reply = props.reply;
  const mock = {
    name: "ahahahahahaha",
    content: "HAHAHHAHAHAHAHAHHAAHHA this is really really interesting!",
    likecount: 3,
  };
  return (
    <div className="flex p-2 mt-1 border-b-2 border-gray-200">
      <div className="w-10 flex-shrink-0">
        <img
          src={`https://picsum.photos/seed/${Math.floor(
            Math.random() * 1000
          )}/40/40`}
          alt="head"
        />
      </div>
      <div className="relative flex-grow pl-2 text-left">
        <div className="mb-2">{mock.name}</div>
        <div className="min-h-36">{reply.content}</div>
        <div className="mt-2 text-right">
          <div className="inline-block mr-1 text-gray-600">
            {reply.likecount}
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
