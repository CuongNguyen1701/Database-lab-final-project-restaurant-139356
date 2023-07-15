import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { storeUserData } from "../../storage-managers/userData";
const UserPage = ({ userData }) => {
  useEffect(() => {
    if (userData === null) return;
    storeUserData(userData);
  }, [userData]);
  return userData ? (
    <div className="select-none bg-white flex flex-col items-center p-32 gap-32">
      <h1 className="flex flex-col gap-3 text-xl font-extrabold text-primary">
        <div>username: {userData.id}</div>
        <div>name: {userData.name}</div>
        <div>email: {userData.email}</div>
        <div>phone: {userData.phone}</div>
        <div>address: {userData.address}</div>
        <div>role: {userData.role}</div>
      </h1>
    </div>
  ) : null;
  // <Navigate to="/" />
};

export default UserPage;
