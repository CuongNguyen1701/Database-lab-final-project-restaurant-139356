import { useState } from "react";

const ChatBot = () => {
  const [displayChat, setDisplayChat] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState("");
  return (
    <div className="fixed bottom-0 left-0 z-30 text-yellow-500 bg-primary  m-5 rounded-2xl ">
      {displayChat ? (
        <div className="border-4 border-primary bg-white pt-20 pb-3 pl-20 pr-5 rounded-xl text-primary">
          Chat box here
          <div className=" flex flex-row gap-3">
            <button
              className="absolute bottom-0 left-0 bg-yellow-500 border-4 border-primary p-3 rounded-xl font-bold select-none"
              onClick={(e) => {
                e.preventDefault();
                setDisplayChat(false);
              }}
            >
              Hide
            </button>
            <input
              type="text"
              className="bg-white border-4 border-primary rounded-lg p-3 w-full text-xl"
              value={chatInput}
              onChange={(e) => {
                e.preventDefault();
                setChatInput(e.target.value);
              }}
            ></input>
            <button className="bg-yellow-500 p-3 rounded-xl font-bold">
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          className="text-yellow-500 h-full w-full p-5 select-none"
          onClick={(e) => {
            e.preventDefault();
            setDisplayChat(true);
          }}
        >
          Chat Bot
        </button>
      )}
    </div>
  );
};

export default ChatBot;
