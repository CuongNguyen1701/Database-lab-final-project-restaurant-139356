import { useState, useRef } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env files
const ChatBot = () => {
  const bottomRef = useRef(null);
  const [displayChat, setDisplayChat] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const HandleSend = async (e) => {
    e.preventDefault();
    if (chatInput === "") return;
    const message = {
      type: "user",
      message: chatInput,
    };
    setChatHistory([...chatHistory, message]);
    //show latest messages
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setChatInput("");
    //TODO: Handle chatbot
    const response = await axios.post(`${backendUrl}/chatbot`, {
      message: chatInput,
    });
    setChatHistory([...chatHistory, response]);
    //show latest messages
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const MessageBubble = ({ item }) => {
    return (
      <div
        className={`${
          item.type === "bot"
            ? "bg-yellow-500 rounded-bl-none"
            : "bg-white self-end rounded-br-none"
        } text-xl rounded-lg p-3 w-fit border-2 border-primary`}
      >
        {item.message}
      </div>
    );
  };
  return (
    <div className="fixed bottom-0 left-0 z-30 text-yellow-500 bg-primary  m-5 rounded-2xl ">
      {displayChat ? (
        <div className="border-4 border-primary bg-white pt-5 pb-3 pl-20 pr-5 rounded-xl text-primary">
          <div className="flex flex-col max-h-96 overflow-scroll no-scrollbar">
            {chatHistory.map((item, index) => {
              return <MessageBubble item={item} key={index}></MessageBubble>;
            })}
            <div ref={bottomRef}></div>
          </div>
          Chat here
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  HandleSend(e);
                }
              }}
            ></input>
            <button
              className="bg-yellow-500 p-3 rounded-xl font-bold"
              onClick={HandleSend}
            >
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
