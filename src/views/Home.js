import { useSelector } from "react-redux";

function Home() {
  const login = useSelector((state) => state.login);
  return (
    <div>
      <div className="flex justify-center w-full  mt-4 rounded-full items-center flex-col">
        <img
          src={`https://picsum.photos/seed/home/80/80`}
          alt="head"
          className="w-16 h-16"
        />
        <div className="mt-2 text-2xl font-bold">{login.username}</div>
        <div className="text-lg mt-2 text-gray-500">{login.bio}</div>
      </div>
    </div>
  );
}

export default Home;
