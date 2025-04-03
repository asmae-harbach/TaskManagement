
import { Outlet } from "react-router-dom";
import Sidebar from "../component/Home/Sidebar";

const Home = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="sticky top-0 left-0 h-screen border-r border-gray-300 flex flex-col items-center justify-between p-8">
        <Sidebar />
      </div>

      <div className="w-5/6 h-screen py-4 px-4 md:px-9 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
