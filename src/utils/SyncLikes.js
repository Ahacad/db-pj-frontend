import axios from "axios";
import { useDispatch } from "react-redux";
import { updateLikedRepliesAction } from "actions";

export const useSyncLikedReplies = (id) => {
  const dispatch = useDispatch();
  axios
    .get(`https://localhost:4000/users/${id}/replylikes`)
    .then((resp) => resp.data)
    .then((replies) => {
      dispatch(updateLikedRepliesAction(replies));
    })
    .catch((err) => console.error(err));
};
