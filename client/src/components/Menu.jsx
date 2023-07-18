import { useState, useEffect } from "react";
// import menuData from "../constants/menuData.json";
import { InputField } from "./InputFields/InputField";
import GenericButton from "./Buttons/GenericButton";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env files
const FilterButton = ({ text, selected, setSelected }) => {
  const filterStyle =
    selected === text
      ? "rounded-3xl py-2 px-6 bg-primary text-white w-fit"
      : "bg-transparent  rounded-3xl py-2 px-6 hover:bg-primary hover:text-white w-fit";
  return (
    <button className={filterStyle} onClick={(e) => setSelected(text)}>
      {text}
    </button>
  );
};
const MenuItem = ({ itemKey, item, addToCart }) => {
  return (
    <motion.div
      key={itemKey}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      // exit={{ opacity: 0, x: 100 }}
      className="flex flex-col gap-5 bg-primary-light text-white  rounded-2xl h-full w-96 "
    >
      <div className="rounded-bl-3xl rounded-t-xl bg-slate-200 flex flex-col items-center py-10">
        <img
          src={item.imageURL}
          alt={item.name}
          className="h-40 w-40 rounded-full"
        />
      </div>

      <div className="px-10 pb-10 flex flex-col justify-between h-full">
        <div className="text-xl">{item.name}</div>
        <div className="text-sm">{item.description}</div>

        <div className="justify-between flex flex-row pt-5">
          <div className="text-xl">${item.price}</div>
          <button
            className="rounded-full bg-yellow-500 hover:bg-yellow-300 w-12 h-12"
            onClick={(e) => {
              addToCart(item);
            }}
          >
            🛒
          </button>
        </div>
      </div>
    </motion.div>
  );
};

//Get distinct categories from menuData
// let categoryList = [...new Set(menuData.map((item) => item.category))];
const Menu = ({ addToCart }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = { data: " " };
      console.log(backendUrl);
      const res = await axios.post(`${backendUrl}/search/item`, data, {
        withCredentials: true,
      });
      setData(res.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setCategoryList([...new Set(data.map((item) => item.category[0]))]);
  }, [data]);
  const HandleSearch = async (e) => {
    e.preventDefault();
    if (query === "") return;
    if (query === "all") setQuery(" ");
    //TODO: Handle query
    const data = { data: query };

    const res = await axios.post(`${backendUrl}/search/item`, data, {
      withCredentials: true,
    });
    setData(res.data);
    setSelectedFilter("All");
  };
  return (
    <div className="bg-white text-primary flex flex-col items-center gap-5 p-10 pt-32">
      <div className="text-4xl font-body">Our Menu</div>
      <div className="w-1/2 flex flex-col lg:flex-row  gap-3 items-center">
        <InputField value={query} setValue={setQuery} placeholder="Search..." />
        <GenericButton text="Search" onClick={HandleSearch} />
      </div>
      <div className="flex flex-row flex-wrap gap-3">
        <FilterButton
          text="All"
          selected={selectedFilter}
          setSelected={setSelectedFilter}
        />
        {categoryList.map((category, index) => (
          <FilterButton
            text={category}
            key={index}
            selected={selectedFilter}
            setSelected={setSelectedFilter}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 items-center mx-auto h-fit">
        <AnimatePresence>
          {data.map((item, index) =>
            item.category[0] === selectedFilter || selectedFilter === "All" ? (
              <MenuItem
                key={index}
                itemKey={index}
                item={item}
                addToCart={addToCart}
              />
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;
