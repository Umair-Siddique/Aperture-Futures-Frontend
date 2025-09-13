import React from "react";
import { Send } from "lucide-react";

const InputArea = ({
  input,
  handleInputChange,
  handleKeyDown,
  handleSendClick,
}) => {
  return (
    <div
      className="p-4 border-t shadow-md"
      style={{
        backgroundColor: "#FAFAFA",
        borderTopColor: "#FAFAFA",
        borderRadius: "50px"
      }}
    >
      <div className="flex gap-3 items-end relative">
        <div className="flex-1 relative">
          <textarea
            className="w-full resize-none border px-4 py-3 pr-12 focus:outline-none text-black text-sm shadow-inner transition-all duration-200"
            style={{
              backgroundColor: "#fff",
              borderColor: "#E0E0E0",
              borderRadius: "25px",
              color: "#000",
            }}
            placeholder="Ask anything about UNCS meeting.."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          onClick={handleSendClick}
          className="relative bottom-4 p-3 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: "linear-gradient(258.39deg, #B600EB 0%, #FFD470 102.66%)",
            boxShadow: "0px 4px 12px 0px #0000001A",
            border: "none"
          }}
        >
          <Send size={20} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default InputArea;
