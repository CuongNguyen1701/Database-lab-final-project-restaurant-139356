import { useState } from "react";
import Signin from "../Account/Signin";
const LoginButton = () => {
  const [overlay, setOverlay] = useState(false);
  return (
    <div>
      <button
        className="bg-yellow-500 py-2 px-5 w-32 rounded-3xl text-primary font-semibold hover:bg-yellow-200"
        onClick={(e) => {
          e.preventDefault();
          setOverlay(true);
        }}
      >
        Login
      </button>
      {overlay && <Signin setOverlay={setOverlay} />}
    </div>
  );
};

export default LoginButton;
