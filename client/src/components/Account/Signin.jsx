import { useState } from "react";
import GoogleButton from "../Buttons/GoogleButton";
import FacebookButton from "../Buttons/FacebookButton";
import GenericButton from "../Buttons/GenericButton";
import { Link } from "react-router-dom";
import { InputField } from "../InputFields/InputField";
import bcrypt from "bcryptjs"; //for password hashing
const Signin = ({ setOverlay }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      className="fixed left-0 right-0 top-0 bottom-0 bg-slate-500/75 flex items-center justify-center z-50"
      onClick={(e) => {
        e.preventDefault();
        setOverlay(false);
      }}
    >
      <div
        className="p-5 flex flex-col items-center gap-5 bg-white rounded-2xl z-100 text-primary"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div className="text-primary text-3xl">Sign in</div>
        <InputField placeholder="username" type="text" />
        <InputField placeholder="password" type="password" />
        <GenericButton text="Log in" />
        --- OR ---
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
  );
};

export default Signin;