import React from "react";

const styles =
  "border-2 border-gray-300 rounded-md py-3 px-5 w-full text-xl text-white";
const SelectField = ({ value, setValue, placeholder }) => {
  return (
    <select
      value={value}
      placeholder="how many persons?"
      className={styles}
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="1">1 Person</option>
      <option value="2">2 Persons</option>
      <option value="3">3 Persons</option>
      <option value="4">4 Persons</option>
      <option value="5">5 Persons</option>
    </select>
  );
};
const InputField = ({ value, setValue, placeholder, type }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className={styles}
    />
  );
};

export { SelectField, InputField };
