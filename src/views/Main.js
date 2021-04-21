import Card from "components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

function Foo() {
  const classes = useStyles();
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
      <Fab color="primary" className={classes.fab}>
        <AddIcon />
      </Fab>
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
