import React, { useEffect, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { styles } from "../styles";
import { navLinks, adminNavLinks } from "../constants";
import { logo, menu, close } from "../assets";
import LoginButton from "./Buttons/LoginButton";
import { LogoTitle, NavItem } from "./NavBarComponents";

const Navbar = ({ isAdmin }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const currentPath = useLocation().pathname;

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 absolute top-0 z-20 no-scrollbar ${
        currentPath !== "/" ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full mx-auto select-none ">
        <LogoTitle setActive={setActive} />
        <LoginButton />
        {/* Navigation stuffs */}
        <ul className="flex-row hidden gap-10 list-none sm:flex">
          {navLinks.map((nav) => (
            <div key={nav.id}>
              <NavItem nav={nav} active={active} setActive={setActive} />
            </div>
          ))}
          {isAdmin &&
            adminNavLinks.map((nav) => (
              <div key={nav.id}>
                <NavItem nav={nav} active={active} setActive={setActive} />
              </div>
            ))}
        </ul>
        <div className="flex items-center justify-end flex-1 sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="flex flex-col items-start justify-end flex-1 gap-4 list-none">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  {currentPath !== "/" ? (
                    <Link to={`/#${nav.id}`}>{nav.title}</Link>
                  ) : (
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
