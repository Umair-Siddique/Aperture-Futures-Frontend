import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CalendarIcon from "../../assets/calender-svgrepo-com.svg";
export default function AdminMeetingButton({ fullWidth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === "/admin-meeting";
  return (
    <button
      className={`flex items-center gap-3 px-6 py-2 rounded-full ${isActive ? 'bg-[#ececec]' : 'bg-[#ffffff]'} hover:bg-[#ececec] focus:outline-none ${fullWidth ? 'w-full justify-start' : ''}`}
      style={{ boxShadow: "none", border: "none" }}
      onClick={() => navigate("/admin-meeting")}
    >
      <span>
        <img src={CalendarIcon} alt="Calendar Icon" className="w-6 h-6" />
      </span>
      <span className="font-medium text-lg text-gray-600">Meetings</span>
    </button>
  );
}