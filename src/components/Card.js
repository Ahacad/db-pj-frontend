import { formatDistanceToNow } from "date-fns";

export default function Card(props) {
  return (
    <div className="w-72 shadow-xl">
      {props.name},{" "}
      {formatDistanceToNow(new Date(props.createTime), { addSuffix: true })}
    </div>
  );
}
