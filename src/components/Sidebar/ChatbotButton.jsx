import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChatbotIcon from "../../assets/chat-round-dots-svgrepo-com.svg";
export default function ChatbotButton({ fullWidth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === "/chatbot";
  return (
    <button
      className={`flex items-center gap-3 px-6 py-2 rounded-full ${isActive ? 'bg-[#ececec]' : 'bg-[#ffffff]'} hover:bg-[#ececec] focus:outline-none ${fullWidth ? 'w-full justify-start' : ''}`}
      style={{ boxShadow: "none", border: "none", marginTop: '8px' }}
      onClick={() => navigate("/chatbot")}
    >
      <span>
        <img src={ChatbotIcon} alt="Chatbot Icon" className="w-6 h-6" />
      </span>
      <span className="font-medium text-lg text-gray-600">Chatbot</span>
    </button>
  );
}
