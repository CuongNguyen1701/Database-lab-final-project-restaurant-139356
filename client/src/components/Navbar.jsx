import React, { useEffect, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { styles } from "../styles";
import { navLinks, adminNavLinks } from "../constants";
import { logo, menu, close } from "../assets";
import LoginButton from "./Buttons/LoginButton";
import { LogoTitle, NavItem } from "./NavBarComponents";

const Navbar = ({ isAdmin, userData, setUserData }) => {
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
        <LoginButton userData={userData} setUserData={setUserData} />
        {/* Navigation stuffs */}
        <ul className="flex-row hidden gap-10 list-none sm:flex">
          {navLinks.map((nav) => (
            <NavItem
              key={nav.id}
              nav={nav}
              active={active}
              setActive={setActive}
            />
          ))}
          {isAdmin &&
            adminNavLinks.map((nav) => (
              <NavItem
                key={nav.id}
                nav={nav}
                active={active}
                setActive={setActive}
              />
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
            } p-6 bg-primary-light absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="flex flex-col items-start justify-end flex-1 gap-4 list-none">
              {navLinks.map((nav) => (
                <NavItem
                  key={nav.id}
                  nav={nav}
                  active={active}
                  setActive={setActive}
                />
              ))}
              {isAdmin &&
                adminNavLinks.map((nav) => (
                  <NavItem
                    key={nav.id}
                    nav={nav}
                    active={active}
                    setActive={setActive}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
