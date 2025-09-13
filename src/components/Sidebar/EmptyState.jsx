import { MessageSquare, Search } from "lucide-react";

const EmptyState = ({ type, onRefresh }) => {
  if (type === "loading") {
    return (
      <div
        className="px-4 py-8 flex flex-col items-center justify-center"
        style={{ color: "#E0E0E0" }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
        <p className="text-center">Loading chats...</p>
      </div>
    );
  }

  if (type === "no-chats") {
    return (
      <div
        className="px-4 py-8 flex flex-col items-center justify-center"
        style={{ color: "#E0E0E0" }}
      >
        <MessageSquare
          size={48}
          className="mb-4"
          style={{ color: "#1F1F1F" }}
        />
        <p className="text-center text-lg font-medium mb-2" style={{ color: '#1F1F1F' }}>No chats yet</p>
        <p className="text-center text-sm mb-4" style={{ color: '#1F1F1F' }}>
          Click "New Chat" to start your first conversation
        </p>
        <button
          onClick={onRefresh}
          className="text-sm px-3 py-1 rounded-md transition-colors"
          style={{
            backgroundColor: "#fff",
            color: "#1F1F1F",
            border: "none",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f5f5f5";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#fff";
          }}
        >
          Refresh
        </button>
      </div>
    );
  }

  if (type === "no-search-results") {
    return (
      <div
        className="px-4 py-8 flex flex-col items-center justify-center"
        style={{ color: "#E0E0E0" }}
      >
        <Search size={32} className="mb-2" style={{ color: "#1F1F1F" }} />
        <p className="text-center">No chats match your search</p>
        <p className="text-center text-sm mt-1">Try a different search term</p>
      </div>
    );
  }

  return null;
};

export default EmptyState;
