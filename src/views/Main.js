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
          //console.log(data);
        });
    };
    fetchData();
  }, []);
  return (
    <>
      <Card
        name="user1"
        createTime="2021-04-04T11:19:57.563Z"
        title="Hello world, the first post"
      />
      {posts.map((post) => (
        <Card
          name={post.userid}
          createTime={post.create_time}
          title={post.title}
          key={post.id}
        />
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
