import React from "react";
import { Link } from "react-router-dom";
const LogoTitle = ({ setActive }) => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2"
      onClick={() => {
        setActive("");
        window.scrollTo(0, 0);
      }}
    >
      <img
        src={"/logo.png"}
        alt="logo"
        className="object-contain w-9 h-9"
        onDragStart={(e) => {
          e.preventDefault();
        }}
      />
      <p className="text-white text-[18px] font-bold cursor-pointer flex md:flex-row flex-col">
        DreamFlare &nbsp;
        <span className="hidden sm:block"> | Gourmet</span>
      </p>
    </Link>
  );
};

export default LogoTitle;
