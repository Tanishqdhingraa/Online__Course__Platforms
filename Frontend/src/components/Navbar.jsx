import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full h-16 bg-slate-900 text-white flex items-center justify-between px-6 shadow-md relative">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-5 w-1/4">
        <button className="text-lg hover:text-sky-400 transition">
          <FaSearch />
        </button>
        <button className="text-lg hover:text-sky-400 transition">
          <FaShoppingCart />
        </button>
      </div>

      {/* CENTER LOGO */}
      <div className="w-2/4 text-center">
        <h1 className="text-xl font-semibold text-sky-400 tracking-wide">
          EduSphere – World of Learning
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-end w-1/4 relative">
        <button
          onClick={() => setOpen(!open)}
          className="text-lg hover:text-sky-400 transition"
        >
          <FaBars />
        </button>

        {/* DROPDOWN MENU */}
        {open && (
          <div className="absolute right-0 top-12 w-52 bg-white text-slate-800 rounded-xl shadow-lg py-2 flex flex-col z-50">
            <button className="px-5 py-2 text-left hover:bg-slate-100">My Profile</button>
            <button className="px-5 py-2 text-left hover:bg-slate-100">My Courses</button>
            <button className="px-5 py-2 text-left hover:bg-slate-100">Wishlist</button>
            <button className="px-5 py-2 text-left hover:bg-slate-100">Settings</button>
            <button className="px-5 py-2 text-left hover:bg-slate-100">Help Center</button>
            <button className="px-5 py-2 text-left hover:bg-red-50 text-red-500">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
