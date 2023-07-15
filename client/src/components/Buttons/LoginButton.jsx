import { useState } from "react";
import Signin from "../Account/Signin";
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
        userData.name
      )}
      {overlay && <Signin setOverlay={setOverlay} setUserData={setUserData} />}
    </div>
  );
};

export default LoginButton;
