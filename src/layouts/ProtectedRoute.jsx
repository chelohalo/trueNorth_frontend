import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const ProtectedRoute = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "loading...";

  return (
    <>
      {auth._id ? (
        <div className="bg-gray-100">
          <div>
            <Header />
          </div>
          <div className="md:flex md:min-h-screen" >
            <SideBar />
            <main className="p-10 bg-sky-50 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;
