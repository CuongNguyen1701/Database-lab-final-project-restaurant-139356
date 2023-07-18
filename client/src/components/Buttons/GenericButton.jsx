import React from "react";

const GenericButton = ({ text, onClick }) => {
  return (
    <button
      className="bg-yellow-500 hover:bg-yellow-300 py-3 px-10 w-fit rounded-3xl text-primary"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default GenericButton;
