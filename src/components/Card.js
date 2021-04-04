import { formatDistanceToNow } from "date-fns";

function displayTime(date) {
  // TODO: if time > 1 month, display absoulte time
}

export default function Card(props) {
  return (
    <div className="w-2/5 h-32 pt-2 pl-2 mb-2 text-left border-b-2 border-gray-200 grid grid-cols-7 gap-1">
      <div className="col-span-1">{props.name}</div>
      <div className="col-span-5">
        <div>{props.title}</div>
      </div>
      <div className="col-span-1">
        {formatDistanceToNow(new Date(props.createTime), { addSuffix: true })}
        {/* TODO: like, reply count */}
      </div>
    </div>
  );
}
