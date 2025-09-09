import Navbar from "./Navbar";
import { Outlet, Link } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
       <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};
