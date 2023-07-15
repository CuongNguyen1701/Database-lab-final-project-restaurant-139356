import React from "react";
import { Navigate } from "react-router-dom";
const UserPage = ({ userData }) => {
  return userData ? (
    <div className="select-none bg-white flex flex-col items-center p-32 gap-32">
      <h1 className="text-6xl font-extrabold text-primary">
        {JSON.stringify(userData)}
      </h1>
    </div>
  ) : null;
  // <Navigate to="/" />
};

export default UserPage;
