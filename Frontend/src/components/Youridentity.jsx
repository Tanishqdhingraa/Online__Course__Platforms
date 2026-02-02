import React from "react";

function Youridentity() {
  return (
    <div className="w-full mt-4 bg-white border-b border-slate-200 shadow-sm px-6 py-3 flex items-center justify-between">
      
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-sky-400"
        />

        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Alex Johnson
          </h2>
          <p className="text-xs text-sky-500 font-medium">
            Full Stack Web Developer
          </p>
        </div>
      </div>

      {/* Right: Short About */}
      <div className="hidden md:block max-w-md text-xs text-slate-600 leading-snug">
        Passionate about building modern web apps, learning new tech, and
        creating scalable backend systems.
      </div>
    </div>
  );
}

export default Youridentity;
