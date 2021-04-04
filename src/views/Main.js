import Card from "components/Card";
import axios from "axios";
import { useEffect } from "react";

function Foo() {
  useEffect(() => {
    const fetchData = async () => {
      // TODO: fetch main panel post data
    };
  }, []);
  return (
    <>
      <Card
        name="user1"
        createTime="2021-04-04T11:19:57.563Z"
        title="Hello world, the first post"
      />
      <Card
        name="user1"
        createTime="2021-04-04T11:19:57.563Z"
        title="Hello world, the first post"
      />
      <Card
        name="user1"
        createTime="2021-04-04T11:19:57.563Z"
        title="Hello world, the first post"
      />
      <Card
        name="user1"
        createTime="2021-04-04T11:19:57.563Z"
        title="Hello world, the first post"
      />
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
