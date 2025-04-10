import { Cat, LogOut, Menu, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-10">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold hover:text-blue-400 transition"
        >
          <Cat className="w-6 h-6" />
          <span>
            Stack<span className="text-slate-500">Wave</span>
          </span>
        </Link>


        {/* Nav Links */}
        <div
          className={`flex-col md:flex md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0 ${
            isOpen ? "flex" : "hidden"
          } md:flex`}
        >
          <Link
            to="/ask"
            className="hover:text-white transition btn  btn-outline border-slate-500"
            onClick={() => setIsOpen(false)}
          >
            Ask Question
          </Link>

          {isLoggedIn ? (
            <>
              <Link to={"/profile"} className={`btn  gap-2`}>
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-error  flex items-center gap-1"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
