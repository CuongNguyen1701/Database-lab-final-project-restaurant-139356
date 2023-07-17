import React from "react";
import { Link } from "react-router-dom";
import style from "../../index.css";

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
      <p className="text-white text-[21px] font-bold cursor-pointer flex md:flex-row flex-col font-body">
        DreamFlare &nbsp;
        <span className="hidden sm:block font-body text-[23px]">
          {" "}
          | Gourmet
        </span>
      </p>
    </Link>
  );
};

export default LogoTitle;
