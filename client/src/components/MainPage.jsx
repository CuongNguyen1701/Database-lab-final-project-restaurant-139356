import { Hero } from "./MainPageComponents";
import React, { useState } from "react";
import About from "./About";
import Menu from "./Menu";
import Booking from "./Booking";
import { motion, AnimatePresence } from "framer-motion";
const MainPage = ({ addToCart }) => {
  return (
    <div className="no-scrollbar">
      <div className="bg-no-repeat bg-hero-pattern relative bg-cover">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
          </motion.div>
        </AnimatePresence>
      </div>
      <Menu addToCart={addToCart} />
      <About />
      <Booking />
    </div>
  );
};

export default MainPage;
