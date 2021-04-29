import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showErrorSnackbar } from "actions";

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const login = useSelector((state) => state.login);
  if (!login.loggedin) {
    dispatch(showErrorSnackbar("登录后才有信息哦"));
  }
  return (
    <div>
      {login.loggedin && (
        <div className="flex justify-center w-full  mt-4 rounded-full items-center flex-col">
          <img
            src={`https://picsum.photos/seed/home/80/80`}
            alt="head"
            className="w-16 h-16"
          />
          <div className="mt-2 text-2xl font-bold">{login.username}</div>
          <div className="mt-2 text-lg text-gray-500" contentEditable>
            {login.bio || "这个人很懒，什么也没有留下。。。"}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
