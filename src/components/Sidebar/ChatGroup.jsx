import ChatListItem from "./ChatListItem";

const ChatGroup = ({
  timeLabel,
  chats,
  activeId,
  onChatClick,
  onDeleteChat,
}) => {
  return (
    <div className="">
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: "#2D2D2D" }}
      >
        {timeLabel}
      </h3>
      <div className="space-y-1">
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chatId={chat.id}
            title={chat.title}
            chat={chat}
            activeId={activeId}
            onChatClick={onChatClick}
            onDeleteChat={onDeleteChat}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatGroup;
