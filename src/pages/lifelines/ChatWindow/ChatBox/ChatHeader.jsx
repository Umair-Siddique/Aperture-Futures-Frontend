import React, { useRef, useEffect } from "react";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
// const ChatHeader = ({
// import { useNavigate } from "react-router-dom";

const LifelineChatHeader = ({ onDownloadReport }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-end px-4 py-4 bg-transparent">
      <button
        className="px-6 py-2 rounded-full border border-[#E0E0E0] bg-white text-black font-medium shadow"
        style={{ borderRadius: "25px" }}
        onClick={onDownloadReport}
      >
        Download
      </button>
      <button
        className="px-6 py-2 rounded-full border border-[#E0E0E0] bg-white text-black font-medium shadow"
        style={{ borderRadius: "25px" }}
        onClick={() => navigate("/lifeline-meeting")}
      >
        Explore Meetings
      </button>
    </div>
  );
};

export default LifelineChatHeader;
