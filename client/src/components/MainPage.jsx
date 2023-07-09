import { FileInput, Hero } from "./MainPageComponents";
import React, { useState } from "react";
import About from "./About";
import Menu from "./Menu";
import Booking from "./Booking";
const MainPage = () => {
  return (
    <div>
      <div className="bg-no-repeat bg-hero-pattern relative bg-cover">
        <Hero />
      </div>
      <Menu />
      <About />
      <Booking />
    </div>
  );
};

export default MainPage;
