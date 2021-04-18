import Card from "components/Card";
import axios from "axios";
import { useEffect, useState } from "react";

function Foo() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("https://localhost:4000/posts")
        .then((resp) => {
          return resp.data;
        })
        .then((data) => {
          setPosts(data);
          console.log(data);
        });
    };
    fetchData();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <Card post={post} />
      ))}
    </>
  );
}

export default function Main() {
  return (
    <div>
      <Foo />
    </div>
  );
}
