import { useEffect, useState } from "react";
import { GenericButton } from "../Buttons";
import axios from "axios";
import { loadUserData } from "../../storage-managers/userData";
import { storeCartData } from "../../storage-managers/shoppingCart";
import QRCode from "react-qr-code";
const roundPrice = (price) => {
  return Math.round(price * 100) / 100;
};
const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env files
const ShoppingCart = ({
  cartItems,
  deleteFromCart,
  updateQuantity,
  setCartItems,
}) => {
  const [discountPercent, setDiscountPercent] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [customerID, setCustomerID] = useState(0);
  const [orderID, setOrderID] = useState("");
  useEffect(() => {
    const userData = loadUserData();
    setCustomerID(userData.id);
    const total = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalCost(total);
  }, []);
  const handleCheckout = async (e) => {
    try {
      console.log(customerID);
      const request = {
        customerID: customerID,
        discountPercent: discountPercent,
        totalCost: totalCost,
        listItem: cartItems,
      };
      const response = await axios.post(
        `${backendUrl}/api/create_order`,
        request
      );

      setOrderID(response.data);
      alert(
        "Order created successfully, you can check for detail in your user's page"
      );
      storeCartData([]);
    } catch (error) {
      console.log(error.response.status);
    }
  };
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
      <GenericButton text="Checkout" onClick={handleCheckout} />
      {orderID !== "" && (
        <div className="flex flex-col item-center gap-3 text-2xl font-semibold">
          Your order ID is: {"  "} {orderID}
          <div className="pl-60 item-center">
            <QRCode
              size={256}
              className="w-1/2 h-1/2"
              value={orderID}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
