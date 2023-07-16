import { useState } from "react";
import Signin from "../Account/Signin";
import { Link } from "react-router-dom";
const LoginButton = ({ userData, setUserData }) => {
  const [overlay, setOverlay] = useState(false);
  return (
    <div>
      {!userData ? (
        <button
          className="bg-yellow-500 py-2 px-5 w-32 rounded-3xl text-primary font-semibold hover:bg-yellow-200"
          onClick={(e) => {
            e.preventDefault();
            setOverlay(true);
          }}
        >
          Login
        </button>
      ) : (
        <button>
          <Link
            to="/user"
            className="text-primary bg-yellow-500 rounded-full p-2 hover:bg-yellow-300 font-semibold"
          >
            {userData.name}
          </Link>
        </button>
      )}
      {overlay && <Signin setOverlay={setOverlay} setUserData={setUserData} />}
    </div>
  );
};

export default LoginButton;
