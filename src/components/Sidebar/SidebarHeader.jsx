import { Plus } from "lucide-react";
import { useAuth } from "../../hooks";

const SidebarHeader = ({ onNewChatClick, isCreatingChat }) => {
  const { user } = useAuth();

  // Only show New Chat button if user role is not admin (i.e., regular user)
  const isUser = user?.role !== "admin";

  return (
    <div className="bg-white">
      {/* Logo - shown for both admin and user roles */}
      <div className="flex justify-center">
        <img
          src="/src/assets/logo2.png"
          alt="Logo"
          style={{ display: "block", margin: "0 auto", padding: 0, border: "none", height: "auto", width: "auto" }}
        />
      </div>
      {/* New Chat button - only shown for users */}
      {/* {isUser && (
        <button
          onClick={onNewChatClick}
          disabled={isCreatingChat}
          className="w-full flex items-center justify-center px-4 py-3 text-gray-800 rounded-2xl transition-all duration-200 space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50"
          style={{
            border: "1px solid #E0E0E0",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          onMouseEnter={(e) => {
            if (!isCreatingChat) {
              e.target.style.backgroundColor = "#f9fafb";
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
            }
          }}
        >
          <Plus className="mr-2" /> New Chat
        </button>
      )} */}
    </div>
  );
};

export default SidebarHeader;
