import React from "react";
import { GenericButton } from "../Buttons";
const ShoppingCart = ({ cartItems }) => {
  const distinctCartItems = [...new Set(cartItems)];

  //count quantity of each item
  const displayItems = distinctCartItems.map((item) => {
    let quantity = cartItems.filter((cartItem) => cartItem.id === item.id);
    return { ...item, quantity: quantity.length };
  });
  return (
    <div className="select-none bg-white text-primary flex flex-col items-center p-32 gap-5">
      {displayItems.map((item) => {
        return (
          <div
            className="flex flex-row gap-3 items-center w-1/2 justify-evenly"
            key={item.id}
          >
            <img src={item.imageURL} className="h-10 w-10 rounded-2xl " />
            <div className="w-1/5 font-semibold">{item.name}</div>
            <div className="w-1/5 font-semibold">{item.price}</div>

            <div className="w-1/5 font-semibold">Quantity: {item.quantity}</div>
            <div className="w-1/5 font-semibold">
              Total: {item.quantity * item.price}
            </div>
          </div>
        );
      })}
      <div className="text-2xl font-semibold">
        Grand Total:{" "}
        {displayItems.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        )}
      </div>
      <GenericButton text="Checkout" />
    </div>
  );
};

export default ShoppingCart;
