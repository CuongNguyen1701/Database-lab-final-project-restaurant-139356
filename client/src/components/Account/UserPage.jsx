import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { storeUserData } from "../../storage-managers/userData";
import { GenericButton } from "../Buttons";
import { InputField } from "../InputFields/InputField";
import axios from "axios";
const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env files
const InfoCard = ({ title, info }) => {
  return (
    <div className="flex flex-row items-center gap-3 text-xl text-yellow-100 rounded-full bg-primary-light w-2/3 ">
      <div className="font-extrabold p-3 w-1/3">{title}</div>
      {info ? (
        <div className="text-primary bg-yellow-300 h-full w-2/3 p-3 rounded-r-full">
          {info}
        </div>
      ) : (
        <div className="text-primary bg-transparent h-full w-2/3 p-3 rounded-r-full"></div>
      )}
    </div>
  );
};
const OrderCard = ({ order }) => {
  const [showItems, setShowItems] = useState(false);
  return (
    <div className="flex flex-col gap-5 item-center">
      <div> orderID: {order[0].orderID}</div>
      <div>
        Total cost:{" $"}
        {order.reduce(
          (acc, item) => acc + item.quantity * item.itemDetail.price,
          0
        )}
      </div>
      <button
        className="bg-primary text-yellow-100 rounded-full w-1/2 p-3"
        onClick={() => {
          setShowItems((oldState) => !oldState);
        }}
      >
        {showItems ? "Hide" : "Show"}
      </button>
      {showItems &&
        order.map((item) => {
          return (
            <div className="font-normal flex flex-row item-center gap-5">
              <div>itemID: {item.itemID}</div>
              <img
                src={item.itemDetail.imageURL}
                className="h-10 w-10 rounded-full"
              />
              <div>name: {item.itemDetail.name}</div>
              <div>quantity: {item.quantity}</div>
            </div>
          );
        })}
    </div>
  );
};
const UserPage = ({ userData }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData === null) return;
    storeUserData(userData);
  }, [userData]);

  const handleLogout = (e) => {
    e.preventDefault();
    storeUserData(null);
    window.location.reload();
    navigate("/");
  };
  const handleLoadOrders = async (e) => {
    e.preventDefault();
    const customerID = userData.id;
    const response = await axios.get(
      `${backendUrl}/api/history/get_all_orders/${customerID}`
    );
    console.log(response.data);
    setOrders(response.data);
  };
  return userData ? (
    <div className="select-none bg-white flex flex-col items-center p-32 gap-32">
      <h1 className="flex flex-col item-center gap-3 text-xl font-extrabold text-primary w-1/2">
        <InfoCard title="Name" info={userData.name} />
        <InfoCard title="Email" info={userData.email} />
        <InfoCard title="Role" info={userData.role} />
        <InfoCard title="Address" info={userData.address} />
        <InfoCard title="Phone" info={userData.phone} />

        <GenericButton text="logout" onClick={handleLogout} />
        <GenericButton text="load orders" onClick={handleLoadOrders} />
        {orders.length !== 0
          ? orders.map((order) => {
              return <OrderCard order={order} />;
            })
          : null}
      </h1>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default UserPage;
