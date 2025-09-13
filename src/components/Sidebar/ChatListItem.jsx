import { MessageSquare, Trash2 } from "lucide-react";
import { API_URL } from "../../constants";

const ChatListItem = ({
  chatId,
  chat,
  title,
  activeId,
  onChatClick,
  onDeleteChat,
}) => {
  activeId === chatId && console.log("chatId", chatId);
  activeId === chatId && console.log("title", title);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteChat(chat.id, e);
  };

  const handleChatClick = () => {
    onChatClick(chat.id);
  };

  return (
    <div
      onClick={handleChatClick}
      className="group flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors"
      style={{
        backgroundColor: activeId === chat.id ? "#F5F5F5" : "transparent",
        color: activeId === chat.id ? "#2D2D2D" : "#747474",
      }}
      onMouseEnter={(e) => {
        if (activeId !== chat.id) {
          e.currentTarget.style.backgroundColor = "#E5E5E5";
        }
      }}
      onMouseLeave={(e) => {
        if (activeId !== chat.id) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* <MessageSquare
          size={16}
          className="flex-shrink-0"
          style={{
            color: activeId === chat.id ? "white" : "#E0E0E0",
          }}
        /> */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{chat.title}</p>
          {chat.messages && chat.messages.length > 0 && (
            <p
              className="text-xs truncate mt-1"
              style={{
                color:
                  activeId === chat.id ? "#2D2D2D" : "white",
              }}
            >
              {chat.messages[chat.messages.length - 1]?.text || "No messages"}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={handleDeleteClick}
          className={`p-1 rounded transition-all ${
            activeId === chat.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{
            color: activeId === chat.id ? "#2D2D2D" : "white",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#dc2626";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color =
              activeId === chat.id ? "#2D2D2D" : "#2D2D2D";
          }}
          aria-label="Delete chat"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default ChatListItem;