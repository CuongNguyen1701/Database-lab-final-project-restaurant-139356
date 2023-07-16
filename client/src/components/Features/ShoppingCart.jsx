import { useEffect } from "react";
import { GenericButton } from "../Buttons";
const roundPrice = (price) => {
  return Math.round(price * 100) / 100;
};
const ShoppingCart = ({ cartItems, deleteFromCart, updateQuantity }) => {
  return (
    <div className="select-none bg-white text-primary flex flex-col items-center p-32 gap-5">
      {cartItems.map((item) => {
        return (
          <div
            className="flex flex-row gap-3 items-center w-1/2 justify-evenly"
            key={item.id}
          >
            <img src={item.imageURL} className="h-10 w-10 rounded-2xl " />
            <div className="w-1/5 font-semibold">{item.name}</div>
            <div className="w-1/5 font-semibold">${item.price}</div>

            <div className="w-1/5 font-semibold">Quantity: {item.quantity}</div>
            <div className="w-1/12 flex flex-row gap-3 font-bold text-xl">
              <button
                onClick={(e) => updateQuantity(item, item.quantity + 1)}
                className="text-orange-700 hover:text-orange-500"
              >
                +
              </button>
              <button
                onClick={(e) => {
                  if (item.quantity > 1)
                    updateQuantity(item, item.quantity - 1);
                }}
                className="text-blue-700 hover:text-blue-500"
              >
                -
              </button>
            </div>
            <div className="w-1/5 font-semibold">
              Total Price: ${roundPrice(item.quantity * item.price)}
            </div>
            <button
              onClick={(e) => deleteFromCart(item)}
              className="text-red-500 rounded-full hover:text-red-300 font-bold p-1"
            >
              Delete
            </button>
          </div>
        );
      })}
      <div className="text-2xl font-semibold">
        Grand Total:{" $"}
        {roundPrice(
          cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
        )}
      </div>
      <GenericButton text="Checkout" />
    </div>
  );
};

export default ShoppingCart;
