import { useState } from "react";
import GoogleButton from "../Buttons/GoogleButton";
import FacebookButton from "../Buttons/FacebookButton";
import GenericButton from "../Buttons/GenericButton";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../InputFields/InputField";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env files
const Signin = ({ setOverlay, setUserData }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (username === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    //TODO: Handle login
    const loginData = {
      username: username,
      password: password,
    };
    const response = await axios.post(`${backendUrl}/auth/signin`, loginData, {
      withCredentials: true,
    });
    console.log(response);
    if (response.status === 200) {
      setOverlay(false);
      alert("Login successful");
      //TODO: store response.data
      setUserData(response.data);
      navigate("/user");
    } else {
      alert("Login failed");
    }
  };
  const handleOAuthLogin = (provider) => {
    window.location.href = `${backendUrl}/auth/${provider}/callback`;
    // const response = await axios.get(`${backendUrl}/auth/${provider}/callback`);
    // console.log(response);
    // if (response.data.success) {
    //   alert("Login successful");
    //   setOverlay(false);
    // }
  };
  return (
    <div
      className="fixed left-0 right-0 top-0 bottom-0 bg-slate-500/75 flex items-center justify-center z-50"
      onClick={(e) => {
        e.preventDefault();
        setOverlay(false);
      }}
    >
      <motion.div
        className="p-5 flex flex-col items-center gap-5 bg-white rounded-2xl z-100 text-primary"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-primary text-3xl">Sign in</div>
        <InputField
          placeholder="username"
          type="text"
          value={username}
          setValue={setUsername}
        />
        <InputField
          placeholder="password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <GenericButton text="Log in" onClick={handleLogin} />
        --- OR ---
        <GoogleButton onClick={() => handleOAuthLogin("google")} />
        <FacebookButton onClick={() => handleOAuthLogin("facebook")} />
        <div className="text-primary">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600"
            onClick={(e) => {
              setOverlay(false);
            }}
          >
            {" "}
            Sign up
          </Link>{" "}
          now!
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;
