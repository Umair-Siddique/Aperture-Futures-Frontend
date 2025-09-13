import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BlueLinesButton({ fullWidth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === "/bluelines";

  return (
    <button
      className={`flex items-center gap-3 px-6 py-2 rounded-full ${isActive ? 'bg-[#ececec]' : 'bg-[#ffffff]'} hover:bg-[#ececec] focus:outline-none ${fullWidth ? 'w-full justify-start' : ''}`}
      style={{ boxShadow: "none", border: "none" }}
      onClick={() => navigate("/bluelines-chat")}
    >
      <span>
        <img 
          src="/src/assets/Bluelines.png" 
          alt="BlueLines" 
          className="w-6 h-6" 
        />
      </span>
      <span className="font-medium text-lg text-gray-600">BlueLines</span>
    </button>
  );
}