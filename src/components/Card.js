import { formatDistanceToNow } from "date-fns";

function displayTime(date) {
  // TODO: if time > 1 month, display absoulte time
}

export default function Card(props) {
  return (
    <div className="h-32 pt-2 pl-2 mb-2 text-left border-b-2 border-gray-200 sm:w-152 grid grid-cols-7 gap-1">
      <div className="col-span-1">
        <img
          src={`https://picsum.photos/seed/${Math.floor(
            Math.random() * 1000
          )}/40/40`}
          alt="head"
        />
        <div className="mt-2 pl-1">{props.name}</div>
      </div>
      <div className="text-xl col-span-5">
        <div>{props.title}</div>
      </div>
      <div className="col-span-1">
        {formatDistanceToNow(new Date(props.createTime), { addSuffix: true })}
        {/* TODO: like, reply count */}
      </div>
    </div>
  );
}
