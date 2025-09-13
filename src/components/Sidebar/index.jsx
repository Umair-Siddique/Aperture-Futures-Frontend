import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { useAuth, useAxios } from "../../hooks";
import DeleteModal from "./DeleteModal";
import SidebarHeader from "./SidebarHeader";
import SearchBar from "./SearchBar";
import BlueLinesChatList from "./BlueLInesChatList";
import LogoutButton from "./LogoutButton";
import { useChatManagement } from "./useChatManagement";
import AdminMeetingButton from "./AdminMeetingButton";
import ChatbotButton from "./ChatbotButton";
import SettingButton from "./SettingButton";
import BlueLinesButton from "./BlueLineButton";
import LiveLinesButton from "./LiveLinesButton";
import { API_URL } from "../../constants";
import ChatHeader from "../../pages/bluelines/ChatWindow/ChatBox/ChatHeader";

const Sidebar = ({ activeId, onSelectChat, onNewChat, onDeleteChat }) => {
  const { logout, user } = useAuth();
  const { request, loading } = useAxios();
  const { isCreatingChat, createNewChat } = useChatManagement();
  const navigate = useNavigate(); // Add this hook

  // Conversation management state
  const [conversations, setConversations] = useState([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [totalConversations, setTotalConversations] = useState(0);

  // State for modals and UI
  const [showConfirmDeleteChat, setShowConfirmDeleteChat] = useState(false);
  const [chatToDeleteId, setChatToDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Refs for infinite scroll
  const scrollContainerRef = useRef(null);
  const loadingRef = useRef(false);

  // Check if user is admin
  // const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  console.log(isAdmin, "this is Admin role");

  // Helper function to generate time labels - MOVED BEFORE useMemo
  const getTimeLabel = useCallback((dateString) => {
    if (!dateString) return "Other";

    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays <= 7) return "This Week";
    if (diffInDays <= 30) return "This Month";
    return "Older";
  }, []);

  // Fetch conversations from API
  const fetchConversations = useCallback(
    async (page = 1, limit = 10, reset = false) => {
      if (loadingRef.current) return;

      loadingRef.current = true;

      try {
        if (page === 1 || reset) {
          setIsLoadingChats(true);
        } else {
          setIsLoadingMore(true);
        }

        const result = await request({
          route: `${API_URL}/conversations/list?page=${page}&limit=${limit}`,
          method: "GET",
          params: { page, limit },
        });
        console.log("Full API response:", result);
        console.log("Response keys:", Object.keys(result));
        console.log(
          "Conversations found:",
          result.conversations || result.data || result.items || []
        );
        // Adjust these property names based on your API response structure
        const newConversations =
          result.conversations || result.data || result.items || [];
        const total = result.total || result.totalCount || 0;
        const totalPages = result.totalPages || Math.ceil(total / limit);

        if (page === 1 || reset) {
          setConversations(newConversations);
        } else {
          setConversations((prev) => [...prev, ...newConversations]);
        }

        setTotalConversations(total);
        setHasMorePages(page < totalPages);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        // You might want to show a toast notification here
      } finally {
        setIsLoadingChats(false);
        setIsLoadingMore(false);
        loadingRef.current = false;
      }
    },
    [request, API_URL]
  );

  // Load initial conversations
  useEffect(() => {
    fetchConversations(1, 10, true);
  }, [fetchConversations]);

  // Infinite scroll handler
  const handleScroll = useCallback(
    (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 100; // 100px threshold

      if (
        isScrolledToBottom &&
        hasMorePages &&
        !isLoadingMore &&
        !loadingRef.current
      ) {
        fetchConversations(currentPage + 1, 10, false);
      }
    },
    [hasMorePages, isLoadingMore, currentPage, fetchConversations]
  );

  // Attach scroll listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Process conversations to match your existing chat structure
  const recentChats = useMemo(() => {
    return conversations.map((conv) => ({
      id: conv.id,
      title: conv.title || conv.name || `Chat ${conv.id}`,
      timeLabel:
        conv?.timeLabel || getTimeLabel(conv.createdAt || conv.updatedAt),
      createdAt: conv.createdAt,
      updatedAt: conv.updatedAt,
      // Add other properties as neededz
    }));
  }, [conversations, getTimeLabel]);

  // Filtered chats
  const filteredChats = useMemo(() => {
    if (!searchTerm) return recentChats;
    return recentChats.filter((chat) =>
      chat.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recentChats, searchTerm]);

  // Group chats by time label
  const groupedChats = useMemo(() => {
    const groups = {};
    filteredChats.forEach((chat) => {
      const timeLabel = chat.timeLabel || "Chats";
      if (!groups[timeLabel]) {
        groups[timeLabel] = [];
      }
      groups[timeLabel].push(chat);
    });
    return groups;
  }, [filteredChats]);

  // Event handlers
  const handleNewChatClick = async () => {
    await createNewChat("New Chat", onNewChat);
    // Refresh the conversation list
    fetchConversations(1, 10, true);
  };

  // Updated chat selection handler to navigate to lifeline page
  const handleChatSelect = useCallback(
    (chatId) => {
      if (chatId) {
        // Navigate to lifeline page with chat ID as parameter
        navigate(`/livelines-chat/${chatId}`);

        // Also call the original onSelectChat if it exists (for parent component state)
        if (onSelectChat) {
          onSelectChat(chatId);
        }
      }
    },
    [navigate, onSelectChat]
  );

  const handleDeleteChatIntent = (chatId, e) => {
    console.log("This is the chat id", chatId);
    e.stopPropagation();
    setChatToDeleteId(chatId);
    setShowConfirmDeleteChat(true);
  };

  const handleConfirmDeleteChat = async () => {
    if (!chatToDeleteId) return;

    try {
      // Call the delete API directly in parent
      // delete not working in live ???
      const result = await request({
        route: `${API_URL}/conversations/${chatToDeleteId}`,
        method: "DELETE",
      });

      console.log("Delete successful:", result);

      // Remove the deleted chat from local state
      setConversations((prev) =>
        prev.filter((conv) => conv.id !== chatToDeleteId)
      );

      // Update total conversations count
      setTotalConversations((prev) => Math.max(0, prev - 1));

      // If deleted chat was active, navigate away
      if (activeId === chatToDeleteId && onSelectChat) {
        onSelectChat(null);
      }

      // Close modal and clean up
      setShowConfirmDeleteChat(false);
      setChatToDeleteId(null);
    } catch (error) {
      console.error("Error deleting chat:", error);
      // Still close modal on error - you might want to show error message instead
      setShowConfirmDeleteChat(false);
      setChatToDeleteId(null);
    }
  };

  const getChatNameToDelete = () => {
    const chat = recentChats.find((c) => c.id === chatToDeleteId);
    return chat ? chat.title : "this chat";
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const refreshChats = () => {
    fetchConversations(1, 10, true);
  };

  return (
    <div
      className="flex flex-col h-full bg-white border-r text-black"
      style={{ borderRightColor: "#E0E0E0" }}
    >
      <div className="flex flex-col flex-grow">
        <SidebarHeader
          onNewChatClick={handleNewChatClick}
          isCreatingChat={isCreatingChat}
        />

        {/* Admin section */}
        {isAdmin && (
          <div className="px-6 pb-2 flex flex-col gap-4">
            <AdminMeetingButton fullWidth />
            {/* Uncomment if needed */}
            {/* <ChatbotButton fullWidth />
          <SettingButton fullWidth /> */}
          </div>
        )}

        {/* Main content area with scroll */}
        <div
          ref={scrollContainerRef}
          className="px-6 pb-2 flex flex-col gap-4 flex-grow overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={clearSearch}
          />
          {!isAdmin && ( <LiveLinesButton fullWidth />
          )}
          {/* <BlueLinesButton fullWidth /> */}

          <BlueLinesChatList
            groupedChats={groupedChats}
            activeId={activeId}
            onChatClick={handleChatSelect} // Use the new handler
            onDeleteChat={handleDeleteChatIntent}
            isLoadingChats={isLoadingChats}
            searchTerm={searchTerm}
            onRefreshChats={refreshChats}
          />

          {/* Loading indicator for infinite scroll */}
          {isLoadingMore && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-sm text-gray-600">
                Loading more conversations...
              </span>
            </div>
          )}

          {/* No more data indicator */}
          {!hasMorePages && conversations.length > 0 && !isLoadingChats && (
            <div className="flex justify-center py-4">
              <span className="text-sm text-gray-500">
                All conversations loaded ({totalConversations} total)
              </span>
            </div>
          )}

          {/* Empty state */}
          {conversations.length === 0 && !isLoadingChats && (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <p className="text-lg font-medium">No conversations yet</p>
              <p className="text-sm">Start a new chat to begin</p>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="px-6 py-4 border-t" style={{ borderTopColor: "#fff" }}>
        <LogoutButton onLogout={logout} />
      </div>
      {/* Delete Modal */}
      <DeleteModal
        show={showConfirmDeleteChat}
        onClose={() => {
          setShowConfirmDeleteChat(false);
          setChatToDeleteId(null);
        }}
        onConfirm={handleConfirmDeleteChat}
        chatTitle={getChatNameToDelete()}
        chatId={chatToDeleteId}
        loading={loading}
      />
    </div>
  );
};

export default Sidebar;
