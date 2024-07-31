import { Link } from "react-router-dom";
import useOperations from "../hooks/useOperations";
import useAuth from "../hooks/useAuth";

const Header = () => {

  const { cerrarSesionOperations} = useOperations();
  const { cerrarSesionAuth } = useAuth();


  const handleCerrarSesion = ()=> {
    cerrarSesionOperations();
    cerrarSesionAuth();
    localStorage.removeItem('token')
  }

  return (
    <header className="bg-white border-b px-4 py-5">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5">
          TrueNorth
        </h2>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link
            to='/operations'
            className="font-bold uppercase"
            >Operations
          </Link>
          <button 
            type="button"
            className="bg-sky-600 text-white text-sm p-3 rounded-md font-bold uppercase"
            onClick={handleCerrarSesion}
            >Sign off
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
