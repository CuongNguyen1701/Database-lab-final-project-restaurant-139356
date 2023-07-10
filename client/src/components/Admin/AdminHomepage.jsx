import React from "react";
import { Link } from "react-router-dom";
const AdminHomepage = () => {
  return (
    <div className="select-none bg-white flex flex-col items-center p-32 gap-32">
      <h1 className="text-6xl font-extrabold text-primary">Admin</h1>
      <div className="flex flex-col gap-5">
        <Link to="/admin/add-dish">
          <button className="bg-yellow-500 py-2 px-5 w-32 rounded-3xl text-primary font-semibold hover:bg-yellow-200">
            Add Dish
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHomepage;
