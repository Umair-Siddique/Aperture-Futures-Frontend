import { useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import ChatWindow from "./ChatWindow";
import Sidebar from "../../components/Sidebar";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { API_URL } from "../../constants";
import { useAxios } from "../../hooks";

const LifeLinesChatPage = () => {
  const { request, loading } = useAxios();
  const { id } = useParams();
  const location = useLocation();
  const { title, meeting } = location.state || {};
  const [recentChats, setRecentChats] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [shouldFetchMessages, setShouldFetchMessages] = useState(false);
  const [isDesktopCollapsed, setDesktopCollapsed] = useState(false);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const [conversationsLoading, setConversationsLoading] = useState(true);

  // Keyboard event handler for mobile sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  const createConversationAPI = async (conversationTitle) => {
    try {
      setIsCreatingConversation(true);
      const result = await request({
        route: `${API_URL}/conversations/create`,
        method: "POST",
        data: {
          title: conversationTitle,
        },
      });

      // Extract conversation from the nested response structure
      const conversationData =
        result.conversation || result.data?.conversation || result;

      if (result.message === "Conversation already exists") {
        console.warn(
          "Conversation already exists, reusing existing one:",
          conversationData
        );
        return {
          id: conversationData.id,
          title: conversationData.title || conversationTitle,
          created_at: conversationData.created_at,
          updated_at: conversationData.updated_at,
          alreadyExists: true, // Add this flag
          ...conversationData, // Include any other fields from API
        };
      }

      console.log(result, "this is result data");
      toast.success("Conversation created successfully");

      // Return the new conversation data
      return {
        id: conversationData.id,
        title: conversationData.title || conversationTitle,
        created_at: conversationData.created_at,
        updated_at: conversationData.updated_at,
        ...conversationData,
      };
    } catch (error) {
      console.error("Failed to create conversation:", error);
      toast.error("Failed to create conversation");
      throw error;
    } finally {
      setIsCreatingConversation(false);
    }
  };

  // Fetch conversation by ID from API
  const fetchConversationById = async (conversationId) => {
    try {
      const result = await request({
        route: `${API_URL}/conversations/${conversationId}`,
        method: "GET",
      });

      const conversationData =
        result.conversation || result.data?.conversation || result;

      return {
        id: conversationData.id,
        conversationId: conversationData.id,
        title: conversationData.title || "Untitled Chat",
        timeLabel: getChatTimeLabel(
          new Date(conversationData.created_at || conversationData.updated_at)
        ),
        date:
          conversationData.created_at ||
          conversationData.updated_at ||
          new Date().toISOString(),
        messages: conversationData.messages || [],
        isFromAPI: true,
      };
    } catch (error) {
      console.error("Failed to fetch conversation:", error);
      return null;
    }
  };

  // Memoized time label calculation
  const getChatTimeLabel = useCallback((date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const chatDate = new Date(date);
    const chatDay = new Date(
      chatDate.getFullYear(),
      chatDate.getMonth(),
      chatDate.getDate()
    );

    const diffTime = today.getTime() - chatDay.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return "Previous 7 Days";
    if (diffDays <= 30) return "Previous 30 Days";

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return chatDay.getFullYear() === today.getFullYear()
      ? months[chatDay.getMonth()]
      : `${months[chatDay.getMonth()]} ${chatDay.getFullYear()}`;
  }, []);

  // Transform local conversations format
  const transformLocalConversations = useCallback((localConversations) => {
    if (!localConversations || !Array.isArray(localConversations)) return [];

    return localConversations.map((conv) => ({
      ...conv,
      isFromAPI: false,
    }));
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Load local chats from localStorage
        const storedChats = localStorage.getItem("recentChats");
        const localChats = storedChats ? JSON.parse(storedChats) : [];

        // Transform local conversations
        const transformedLocalChats = transformLocalConversations(localChats);

        // Sort chats by date
        let sortedChats = transformedLocalChats.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // If we have an id from URL params, try to find or fetch the conversation
        if (id) {
          console.log("Looking for conversation with ID:", id);

          // First check if it exists in local chats
          let existingChat = sortedChats.find(
            (chat) => chat.id === id || chat.conversationId === id
          );

          if (!existingChat) {
            // Try to fetch from API
            console.log("Conversation not found locally, fetching from API...");
            existingChat = await fetchConversationById(id);

            if (existingChat) {
              // Add to the chats array
              sortedChats = [existingChat, ...sortedChats];
              console.log("Fetched conversation from API:", existingChat);
            } else {
              console.log("Conversation not found in API either");
              toast.error("Conversation not found");
            }
          }

          if (existingChat) {
            setActiveId(existingChat.id);
            setShouldFetchMessages(existingChat.isFromAPI);
            console.log("Set active chat:", existingChat);
          }
        }

        // If we have a title from navigation, create a new conversation
        else if (title && !sortedChats.find((chat) => chat.title === title)) {
          console.log("title i want to check:", title);
          console.log("sortedChats i want to:", sortedChats);
          try {
            const newConversation = await createConversationAPI(title);

            if (newConversation?.alreadyExists) {
              // ✅ Fetch the existing conversation by ID and set it active
              const existingChat = await fetchConversationById(
                newConversation.id
              );
              if (existingChat) {
                // Check if conversation already exists in sortedChats to avoid duplicates
                const existingIndex = sortedChats.findIndex(
                  (chat) =>
                    chat.id === existingChat.id ||
                    chat.conversationId === existingChat.id
                );

                if (existingIndex === -1) {
                  sortedChats = [existingChat, ...sortedChats];
                } else {
                  // Update existing conversation with fresh data
                  sortedChats[existingIndex] = existingChat;
                }

                setActiveId(existingChat.id);
                setShouldFetchMessages(true);
                console.log(
                  "Existing conversation loaded and set active:",
                  existingChat
                );
              }
            } else if (newConversation?.id) {
              // ✅ Normal conversation creation flow
              console.log("Creating new conversation:", newConversation);
              const newChat = {
                id: newConversation.id,
                conversationId: newConversation.id,
                title: title,
                timeLabel: getChatTimeLabel(new Date()),
                date: new Date().toISOString(),
                messages: [],
                isFromAPI: true,
              };

              // Check if conversation already exists to avoid duplicates
              const existingIndex = sortedChats.findIndex(
                (chat) =>
                  chat.id === newChat.id || chat.conversationId === newChat.id
              );

              if (existingIndex === -1) {
                sortedChats = [newChat, ...sortedChats];
              } else {
                sortedChats[existingIndex] = newChat;
              }

              setActiveId(newChat.id);
              setShouldFetchMessages(false);
              console.log("New conversation created and set active:", newChat);
            }
          } catch (error) {
            console.error(
              "API conversation creation failed, falling back to local:",
              error
            );
            const fallbackId = createNewChatLocal(title);
            setActiveId(fallbackId);
          }
        } else if (title && sortedChats.find((chat) => chat.title === title)) {
          // If conversation with this title already exists locally, set it as active
          const existingLocalChat = sortedChats.find(
            (chat) => chat.title === title
          );
          if (existingLocalChat) {
            setActiveId(existingLocalChat.id);
            setShouldFetchMessages(existingLocalChat.isFromAPI || false);
            console.log(
              "Found existing local chat with title:",
              existingLocalChat
            );
          }
        } else {
          // Set active chat to most recent if no specific id or title
          if (sortedChats.length > 0) {
            setActiveId(sortedChats[0].id);
            setShouldFetchMessages(sortedChats[0].isFromAPI || false);
          }
        }

        // Update the sidebar with the latest chats
        setRecentChats(sortedChats);
        console.log("Sidebar updated with chats:", sortedChats);
      } catch (error) {
        console.error("Failed to initialize data:", error);
        toast.error("Failed to load chat history");
      } finally {
        setConversationsLoading(false);
      }
    };

    initializeData();
  }, [id, title]);

  useEffect(() => {
    const activeChatId = localStorage.getItem("activeChatId");
    if (activeChatId) {
      setActiveId(activeChatId);
      // You can also set the `shouldFetchMessages` flag if necessary
    }
  }, []);

  useEffect(() => {
    if (activeId) {
      localStorage.setItem("activeChatId", activeId);
    }
  }, [activeId]);

  // Create new chat locally (fallback)
  const createNewChatLocal = useCallback(
    (chatTitle = "New Chat") => {
      const newId = uuidv4();
      const now = new Date();

      const newChat = {
        id: newId,
        conversationId: null, // No API conversation ID for local chats
        title: chatTitle,
        timeLabel: getChatTimeLabel(now),
        date: now.toISOString(),
        messages: [],
        isFromAPI: false,
      };

      setRecentChats((prevChats) => {
        // Remove existing empty chats with same title
        const filteredChats = prevChats.filter(
          (chat) =>
            !(
              chat.title === chatTitle &&
              (!chat.messages || chat.messages.length === 0)
            )
        );
        return [newChat, ...filteredChats];
      });

      return newId;
    },
    [getChatTimeLabel]
  );

  // Create new chat with API integration
  const createNewChat = useCallback(
    async (chatTitle = "New Chat") => {
      try {
        // Try to create via API first
        const apiConversation = await createConversationAPI(chatTitle);
        console.log(apiConversation, "i am called second");

        const newChat = {
          id: apiConversation.id,
          conversationId: apiConversation.id,
          title: chatTitle,
          timeLabel: getChatTimeLabel(new Date()),
          date: new Date().toISOString(),
          messages: [],
          isFromAPI: true,
        };

        setRecentChats((prevChats) => {
          const filteredChats = prevChats.filter(
            (chat) =>
              !(
                chat.title === chatTitle &&
                (!chat.messages || chat.messages.length === 0)
              )
          );
          return [newChat, ...filteredChats];
        });

        return newChat.id;
      } catch (error) {
        console.error(
          "API chat creation failed, falling back to local:",
          error
        );
        return createNewChatLocal(chatTitle);
      }
    },
    [getChatTimeLabel, createNewChatLocal]
  );

  // Handle new chat creation
  const handleNewChat = useCallback(async () => {
    const existingEmptyChat = recentChats.find(
      (chat) =>
        chat.title === "New Chat" &&
        (!chat.messages || chat.messages.length === 0)
    );

    if (existingEmptyChat) {
      setActiveId(existingEmptyChat.id);
      setShouldFetchMessages(false);
    } else {
      const newId = await createNewChat();
      setActiveId(newId);
      setShouldFetchMessages(false);
    }
  }, [recentChats, createNewChat]);

  // Persist only local chats to localStorage
  useEffect(() => {
    const localChats = recentChats.filter((chat) => !chat.isFromAPI);
    if (localChats.length >= 0) {
      localStorage.setItem("recentChats", JSON.stringify(localChats));
    }
  }, [recentChats]);

  // Handle chat selection
  const handleSelectChat = useCallback(
    (chatId) => {
      setActiveId(chatId);
      const selectedChat = recentChats.find((chat) => chat.id === chatId);
      setShouldFetchMessages(selectedChat?.isFromAPI || false);
    },
    [recentChats]
  );

  // Handle sending messages
  const handleSend = useCallback(
    (messageObj) => {
      setRecentChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== activeId) return chat;

          const existingMessageIndex = chat.messages.findIndex(
            (msg) => msg.id === messageObj.id
          );

          const updatedMessages = [...chat.messages];
          const messageWithTimestamp = {
            ...messageObj,
            id: messageObj.id || uuidv4(),
            timestamp: new Date().toISOString(),
          };

          if (existingMessageIndex > -1) {
            updatedMessages[existingMessageIndex] = {
              ...updatedMessages[existingMessageIndex],
              ...messageWithTimestamp,
            };
          } else {
            updatedMessages.push(messageWithTimestamp);
          }

          return { ...chat, messages: updatedMessages };
        })
      );
    },
    [activeId]
  );

  // Handle chat deletion
  const handleDeleteChat = useCallback(
    (chatId) => {
      setRecentChats((prevChats) => {
        const chatToDelete = prevChats.find((chat) => chat.id === chatId);
        const updatedChats = prevChats.filter((chat) => chat.id !== chatId);

        if (chatId === activeId) {
          setShouldFetchMessages(false);
          const nextChat = updatedChats.length > 0 ? updatedChats[0].id : null;
          setActiveId(nextChat);
          if (nextChat) {
            const selectedChat = updatedChats.find(
              (chat) => chat.id === nextChat
            );
            setShouldFetchMessages(selectedChat?.isFromAPI || false);
          }
        }

        if (chatToDelete) {
          toast.success(`Chat "${chatToDelete.title}" deleted.`, {
            duration: 2000,
          });
        }

        return updatedChats;
      });
    },
    [activeId]
  );

  // Get current active chat details
  const activeChat = useMemo(() => {
    if (!recentChats.length || !activeId) {
      console.log(
        "No active chat found - recentChats length:",
        recentChats.length,
        "activeId:",
        activeId
      );
      return null;
    }
    const found = recentChats.find((chat) => chat.id === activeId);
    console.log("Active chat found:", found);
    return found;
  }, [recentChats, activeId]);

  console.log("Active chat details:", activeChat);

  // Memoized sidebar props
  const sidebarProps = useMemo(
    () => ({
      recentChats,
      activeId,
      onSelectChat: handleSelectChat,
      onNewChat: handleNewChat,
      onDeleteChat: handleDeleteChat,
      isLoading: conversationsLoading,
      isCreating: isCreatingConversation,
    }),
    [
      recentChats,
      activeId,
      handleSelectChat,
      handleNewChat,
      handleDeleteChat,
      conversationsLoading,
      isCreatingConversation,
    ]
  );

  // Show empty state message when no conversations
  const showEmptyState = !conversationsLoading && recentChats.length === 0;

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Mobile/Tablet header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="text-white"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          {isMobileOpen ? (
            <ChevronLeft className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
          <span className="sr-only">{isMobileOpen ? "Close" : "Menu"}</span>
        </button>

        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold">Binkr Daita</h1>
        </div>

        <div className="w-6"></div>
      </div>

      {/* Mobile/Tablet backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile/Tablet sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-hidden bg-gray-800">
          <Sidebar {...sidebarProps} />
          {showEmptyState && (
            <div className="p-4 text-center text-gray-400">
              <p>No conversations yet.</p>
              <p className="text-sm mt-2">Create your first conversation!</p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block relative bg-gray-800 border-r border-gray-700 transition-all duration-300 w-80 h-full">
        {/* Sidebar content */}
        <div className="h-full transition-opacity duration-300 opacity-100 bg-gray-800 overflow-hidden">
          <Sidebar {...sidebarProps} />
          {showEmptyState && (
            <div className="p-4 text-center text-gray-400">
              <p>No conversations yet.</p>
              <p className="text-sm mt-2">Create your first conversation!</p>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
        <div className="flex-1 relative bg-gray-900">
          <div className="relative z-10 h-full bg-gray-900">
            <ChatWindow
              id={id} // Pass the URL param id
              activeId={activeId}
              conversationId={activeChat?.conversationId} // Pass the API conversation ID
              isFromAPI={activeChat?.isFromAPI || false} // Pass flag to indicate if it's an API chat
              title={activeChat?.title} // Pass the conversation title
              onSend={handleSend}
              shouldFetchMessages={shouldFetchMessages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeLinesChatPage;
