import React from "react";
import { InputField } from "../InputFields/InputField";
import { useState } from "react";
import GenericButton from "../Buttons/GenericButton";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storeUserData } from "../../storage-managers/userData";
const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env files
const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const navigate = useNavigate();
  const HandleSignup = async (e) => {
    e.preventDefault();
    if (!validPassword) {
      alert("Password is not valid");
      return;
    }
    if (name === "" || username === "" || phone === "" || email === "") {
      alert("Please fill in all fields");
      return;
    }
    //TODO: Handle signup
    const signupData = {
      id: username,
      name: name,
      username: username,
      phone: phone,
      email: email,
      password: password,
    };
    // const formData = new FormData();
    // formData.append("data", JSON.stringify(signupData));
    const response = await axios.post(`${backendUrl}/auth/signup`, signupData);
    if (response.status === 201) {
      console.log(response.data);
      alert("Signup successful, please go to the login page to login");
      navigate("/");
    }
  };
  return (
    <div className="select-none bg-[#232831] flex flex-col items-center p-32 gap-32">
      <div className="text-6xl font-extrabold">Sign Up</div>
      <form className="w-1/2 flex flex-col gap-5 items-center">
        <InputField
          type={"text"}
          value={name}
          setValue={setName}
          placeholder={"Full Name"}
        />
        <InputField
          type={"text"}
          value={username}
          setValue={setUsername}
          placeholder={"Username"}
        />
        <InputField
          type={"email"}
          value={email}
          setValue={setEmail}
          placeholder={"Email"}
        />
        <InputField
          type={"tel"}
          value={phone}
          setValue={setPhone}
          placeholder={"Phone Number"}
        />
        <InputField
          type={"password"}
          value={password}
          setValue={setPassword}
          placeholder={"Password"}
        />
        <InputField
          type={"password"}
          value={passwordConfirm}
          setValue={setPasswordConfirm}
          placeholder={"Confirm Password"}
        />
        <PasswordChecklist
          rules={["minLength", "number", "capital", "specialChar", "match"]}
          minLength={8}
          specialChar={true}
          number={true}
          capital={true}
          value={password}
          valueAgain={passwordConfirm}
          messages={{
            minLength: `Password must be ${8} chars minimum.`,
            capital: "Password must contain at least 1 capital letter.",
            number: "Password must contain at least 1 number.",
            specialChar: "Password must contain at least 1 special character.",
            match: "Passwords must match.",
          }}
          onChange={(isValid) => {
            setValidPassword(isValid);
            console.log(isValid);
          }}
        />
        <GenericButton text="Sign Up" onClick={HandleSignup} />
      </form>
      <img src="/about-img.png" className="h-96"></img>
    </div>
  );
};

export default Signup;
