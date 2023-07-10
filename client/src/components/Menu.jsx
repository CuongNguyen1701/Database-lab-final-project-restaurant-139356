import React from "react";
import menuData from "../constants/menuData.json";
import { InputField } from "./InputFields/InputField";
import GenericButton from "./Buttons/GenericButton";
const FilterButton = ({ text, selected, setSelected }) => {
  const filterStyle =
    selected === text
      ? "rounded-3xl py-2 px-6 bg-primary text-white"
      : "bg-transparent  rounded-3xl py-2 px-6 hover:bg-primary hover:text-white";
  return (
    <button className={filterStyle} onClick={(e) => setSelected(text)}>
      {text}
    </button>
  );
};
const MenuItem = ({ item }) => {
  return (
    <div className="flex flex-col gap-5 bg-primary-light text-white  rounded-2xl h-full w-96 ">
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
          <div className="text-xl">{item.price}</div>
          <button className="rounded-full bg-yellow-500 hover:bg-yellow-300 p-3">
            🛒
          </button>
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const HandleSearch = (e) => {
    e.preventDefault();
    //TODO: Handle search
  };
  return (
    <div className="bg-white text-primary flex flex-col items-center gap-5 p-10 pt-32">
      <div className="text-4xl">Our Menu</div>
      <div className="w-1/2 flex flex-col lg:flex-row  gap-3 items-center">
        <InputField
          value={search}
          setValue={setSearch}
          placeholder="Search..."
        />
        <GenericButton text="Search" onClick={HandleSearch} />
      </div>
      <div className="flex flex-row gap-3">
        <FilterButton
          text="All"
          selected={selectedFilter}
          setSelected={setSelectedFilter}
        />
        <FilterButton
          text="Burgers"
          selected={selectedFilter}
          setSelected={setSelectedFilter}
        />
        <FilterButton
          text="Pizzas"
          selected={selectedFilter}
          setSelected={setSelectedFilter}
        />
        <FilterButton
          text="Drinks"
          selected={selectedFilter}
          setSelected={setSelectedFilter}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-center mx-auto">
        {menuData.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
