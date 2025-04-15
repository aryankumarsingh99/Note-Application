import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

function Navbar({ setQuery }) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900  py-4 text-white flex justify-between items-center">
      <div className="text-xl dont-bold">
        <Link to="/home">NoteApp</Link>
      </div>
      <input
        type="text"
        placeholder="Search notes"
        className="bg-white text-gray-900 px-4 w-86 py-2 rounded m4-4"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        {!user ? (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded me-4">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 px-4 py-2 rounded me-4">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4">{user.name}</span>
            <button className="bg-red-500 px-4 py-2 rounded" onClick={logout}>
              LogOut
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
