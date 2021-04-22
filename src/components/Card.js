import { formatDistanceToNow } from "date-fns";

function displayTime(date) {
  // TODO: if time > 1 month, display absoulte time
}

export default function Card(props) {
  const { post } = props;
  return (
    <div className="h-32 pt-2 pl-2 text-left border-b-2 border-gray-200 cursor-pointer sm:w-152 grid grid-cols-7 gap-1 hover:bg-gray-50">
      <div className="col-span-1">
        <img
          src={`https://picsum.photos/seed/${Math.floor(
            Math.random() * 1000
          )}/40/40`}
          alt="head"
        />
        <div className="pl-1 mt-2">{post.name}</div>
      </div>
      <div className="text-xl col-span-5" onClick={props.handleClick}>
        <div>{post.title}</div>
      </div>
      <div className="col-span-1">
        <div>
          {formatDistanceToNow(new Date(post.create_time), { addSuffix: true })}
        </div>
        <div className="pl-4 mt-1 text-gray-500">
          {post.replycount === null ? 0 : post.replycount}
        </div>
        {/* TODO: like, reply count */}
      </div>
    </div>
  );
}
