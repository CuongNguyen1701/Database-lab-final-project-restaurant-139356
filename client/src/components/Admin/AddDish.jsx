import { useState } from "react";
import {
  InputField,
  SelectField,
  ImageUploadField,
} from "../InputFields/InputField";
import { GenericButton } from "../Buttons";
import axios from "axios";
const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env files
const InputWrapper = ({ text, children }) => {
  return (
    <div className="w-1/3 grid grid-cols-4 items-center gap-3 text-xl">
      <div className="font-bold col-span-1">{text}: </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
};
const AddDish = () => {
  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [dishCategory, setDishCategory] = useState("");
  const [dishImage, setDishImage] = useState(null);
  const handleAddDish = async () => {
    if (dishName === "" || dishPrice === "" || dishImage === null) {
      alert("Please fill in name, price and image");
      return;
    }
    const dishData = {
      dishName: dishName,
      dishDescription: dishDescription,
      dishPrice: dishPrice,
      dishCategory: dishCategory,
      dishImage: dishImage,
    };
    //TODO: Handle add dish
    const formData = new FormData();
    formData.append("data", JSON.stringify(dishData));
    const response = await axios.post(`${backendUrl}/dishes`, formData);
    console.log(response);
  };
  return (
    <div className="select-none bg-white flex flex-col items-center p-32 gap-16 text-primary">
      <h1 className="text-6xl font-extrabold ">Add a new dish</h1>
      {dishImage ? (
        <div className="flex flex-col gap-2 items-center">
          <img src={dishImage} className="h-48 w-48 border-4 border-primary" />
          <button
            className="bg-red-400 hover:bg-red-500 p-2 rounded-full font-bold"
            onClick={() => setDishImage(null)}
          >
            {" "}
            Delete image
          </button>
        </div>
      ) : (
        <ImageUploadField
          title="Dish Image Upload"
          placeholder="Dish Image"
          value={dishImage}
          setValue={setDishImage}
        />
      )}
      <InputWrapper
        text="Name"
        children={
          <InputField
            type="text"
            placeholder="Dish Name"
            value={dishName}
            setValue={setDishName}
            bgWhite={true}
          />
        }
      />

      <InputWrapper
        text="Description"
        children={
          <InputField
            type="text"
            placeholder="Dish Description"
            value={dishDescription}
            setValue={setDishDescription}
          />
        }
      />
      <InputWrapper
        text="Price"
        children={
          <InputField
            type="text"
            placeholder="Dish Price"
            value={dishPrice}
            setValue={setDishPrice}
          />
        }
      />
      <InputWrapper
        text="Category"
        children={
          <SelectField
            placeholder="Dish Category"
            value={dishCategory}
            setValue={setDishCategory}
            options={[
              { value: "Burgers", text: "Burgers" },
              { value: "Pizzas", text: "Pizzas" },
              { value: "Sides", text: "Sides" },
              { value: "Drinks", text: "Drinks" },
              { value: "Ribs", text: "Ribs" },
              { value: "Salad", text: "Salad" },
              { value: "Desserts", text: "Desserts" },
              { value: "Chicken", text: "Chicken" },
              { value: "Sandwiches", text: "Sandwiches" },
            ]}
          />
        }
      />
      <GenericButton text="Add Dish" onClick={handleAddDish} />
    </div>
  );
};

export default AddDish;
