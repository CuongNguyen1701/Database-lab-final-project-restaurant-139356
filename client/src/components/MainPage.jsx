import { Hero } from "./MainPageComponents";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const MainPage = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-no-repeat bg-hero-pattern relative bg-cover"
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default MainPage;
