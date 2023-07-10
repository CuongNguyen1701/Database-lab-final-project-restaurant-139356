import React from "react";
import { InputField } from "../InputFields/InputField";
import { useState } from "react";
import bcrypt from "bcryptjs"; //for password hashing
import GenericButton from "../Buttons/GenericButton";
const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const HashPassword = (password) => {};
  const Validate = (
    name,
    username,
    phone,
    email,
    password,
    passwordConfirm
  ) => {
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return false;
    }
  };
  const HandleSignup = (e) => {
    e.preventDefault();
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
        <GenericButton text="Sign Up" onClick={HandleSignup} />
      </form>
      <img src="/about-img.png" className="h-96"></img>
    </div>
  );
};

export default Signup;
