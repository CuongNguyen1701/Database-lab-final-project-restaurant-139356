import React from "react";

const styles =
  "border-2 border-gray-300 rounded-md py-3 px-5 w-full text-xl text-white bg-primary-light focus:outline-none focus:ring-2 focus:border-transparent";

const ImageUploadField = ({
  title = "Upload Image",
  value,
  setValue,
  placeholder,
}) => {
  return !value ? (
    <div className="flex flex-col items-center ">
      <label
        for="file-upload"
        className={`${styles} bg-primary-light cursor-pointer hover:bg-primary-light/75`}
      >
        {title}
        <input
          id="file-upload"
          type="file"
          onChange={(e) => {
            const file = URL.createObjectURL(e.target.files[0]);
            setValue(file);
          }}
          className={`self-center hidden`}
        />
      </label>
    </div>
  ) : (
    <div></div>
  );
  S;
};
const SelectField = ({ value, setValue, placeholder, options }) => {
  return (
    <select
      value={value}
      placeholder={placeholder}
      className={styles}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};
const InputField = ({
  value,
  setValue,
  placeholder,
  type,
  bgWhite = false,
}) => {
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

export { SelectField, InputField, ImageUploadField };
