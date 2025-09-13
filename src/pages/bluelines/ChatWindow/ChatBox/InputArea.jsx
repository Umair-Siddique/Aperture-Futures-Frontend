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
        backgroundColor: "#1F1F1F",
        borderTopColor: "#1F1F1F",
      }}
    >
      <div className="flex gap-3 items-end relative">
        <div className="flex-1 relative">
          <textarea
            className="w-full resize-none rounded-2xl border px-4 py-3 pr-12 focus:outline-none text-white text-sm shadow-inner transition-all duration-200"
            style={{
              backgroundColor: "black",
              borderColor: "#1F1F1F",
              "::placeholder": { color: "#E0E0E0" },
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#5BC0EB";
              e.target.style.boxShadow = "0 0 0 2px rgba(91, 192, 235, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#1F1F1F";
              e.target.style.boxShadow =
                "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)";
            }}
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          onClick={handleSendClick}
          className="relative bottom-4 p-3 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: "#00C2A8",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#0074A2";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#00C2A8";
            e.target.style.transform = "scale(1)";
          }}
        >
          <Send size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export default InputArea;
