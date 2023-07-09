import { useState } from "react";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import { Link } from "react-router-dom";
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
      {overlay && (
        <div
          className="fixed left-0 right-0 top-0 bottom-0 bg-slate-500/75 flex items-center justify-center z-50"
          onClick={(e) => {
            e.preventDefault();
            setOverlay(false);
          }}
        >
          <div className="p-5 flex flex-col items-center gap-5 bg-white rounded-2xl z-100">
            <div className="text-primary text-3xl">Log-in</div>
            <GoogleButton />
            <FacebookButton />
            <div className="text-primary">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                {" "}
                Sign up
              </Link>{" "}
              now!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
