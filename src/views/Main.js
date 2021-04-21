import Card from "components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

function Foo() {
  const history = useHistory();
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

  const handleClickPost = (id) => {
    history.push(`/post/${id}`);
  };
  return (
    <>
      <div className="mx-auto sm:w-152 mt-2">
        {posts.map((post) => (
          <Card post={post} handleClick={() => handleClickPost(post.id)} />
        ))}
      </div>

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
