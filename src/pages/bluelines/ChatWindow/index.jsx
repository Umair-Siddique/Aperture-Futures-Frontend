import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { API_URL } from "../../../constants";
import MessageWindow from "./ChatBox/MessageWindow";
import InputArea from "./ChatBox/InputArea";
import ChatHeader from "./ChatBox/ChatHeader";

// Available AI models
const AI_MODELS = [
  {
    id: "claude-sonnet-4-20250514",
    name: "Claude Sonnet 4",
    description: "Default - Balanced performance",
  },
  {
    id: "llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Scout",
    description: "Open source alternative",
  },
];

const ChatWindow = ({ activeId, shouldFetchMessages = false }) => {
  const [input, setInput] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [selectedModel, setSelectedModel] = useState(
    "claude-sonnet-4-20250514"
  );
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [messages, setMessages] = useState([]);
  const [streamingAiResponseText, setStreamingAiResponseText] = useState("");

  // Function to fetch messages for a specific chat
  const fetchChatMessages = async (chatId) => {
    if (!chatId) return;

    setIsLoadingMessages(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user?.access_token;

      if (!access_token) {
        throw new Error("Access token not found. Please log in again.");
      }

      const response = await fetch(`${API_URL}/chat/chat/${chatId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      // Transform the messages to match the expected format
      const transformedMessages =
        data.messages?.map((msg) => ({
          id: msg.id,
          from: msg.sender === "user" ? "user" : "ai",
          text: msg.content,
          timestamp: msg.created_at,
        })) || [];

      setMessages(transformedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error(`Failed to load messages: ${error.message}`);
      setMessages([]);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Modified effect - only fetch when shouldFetchMessages is true
  useEffect(() => {
    if (activeId && shouldFetchMessages) {
      fetchChatMessages(activeId);
    } else if (!activeId) {
      setMessages([]);
    }
  }, [activeId, shouldFetchMessages]);

  // Helper function to convert messages to history format for retrieval API
  const convertMessagesToHistory = (messages) => {
    return messages.map((msg) => ({
      sender: msg.from === "user" ? "user" : "ai",
      content: msg.text,
    }));
  };

  const sendRetrievalQuery = async (query) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user?.access_token;

      if (!access_token) {
        throw new Error("Access token not found. Please log in again.");
      }

      const history = convertMessagesToHistory(messages);

      const requestPayload = {
        access_token,
        conversation_id: activeId || uuidv4(),
        query: query.trim(),
        history: history,
        model_id: selectedModel,
      };

      const response = await fetch(`${API_URL}/retriever/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream finished.");
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        setStreamingAiResponseText(accumulatedText);
      }

      return { success: true, response: accumulatedText };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleSendClick = async () => {
    if (!input.trim() || isSendingMessage) return;

    const userMessage = input.trim();
    setIsSendingMessage(true);
    setStreamingAiResponseText("");

    try {
      const userMessageObj = {
        from: "user",
        text: userMessage,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessageObj]);
      setInput("");

      const apiResponse = await sendRetrievalQuery(userMessage);

      if (apiResponse.success) {
        setMessages((prev) => [
          ...prev,
          {
            from: "ai",
            text: apiResponse.response,
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            isStreaming: false,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            from: "ai",
            text: `Error: ${apiResponse.error}`,
            isError: true,
            id: uuidv4(),
            timestamp: new Date().toISOString(),
          },
        ]);
        toast.error(`Failed to send message: ${apiResponse.error}`);
      }
    } catch (error) {
      console.error("Critical error in handleSendClick:", error);
      toast.error(`A critical error occurred: ${error.message}`);
    } finally {
      setIsSendingMessage(false);
      setStreamingAiResponseText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId);
    setShowModelSelector(false);

    const selectedModelInfo = AI_MODELS.find((model) => model.id === modelId);
    toast.success(`Switched to ${selectedModelInfo.name}`, {
      duration: 2000,
    });
  };

  const currentModel = AI_MODELS.find((model) => model.id === selectedModel);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-800 to-gray-950">
       <img
            src="src/assets/doodle.jpeg" // Update with your image path
            alt="Doodle background"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
          />
      <div className="flex-shrink-0">
        <ChatHeader
          currentModel={currentModel}
          showModelSelector={showModelSelector}
          setShowModelSelector={setShowModelSelector}
          onModelChange={handleModelChange}
          availableModels={AI_MODELS}
        />
      </div>

      <div className="flex-1 min-h-0">
        <MessageWindow
          messages={
            isSendingMessage
              ? streamingAiResponseText
                ? [
                    ...messages,
                    {
                      from: "ai",
                      text: streamingAiResponseText,
                      id: "streaming-temp-ai",
                      isStreaming: true,
                    },
                  ]
                : [
                    ...messages,
                    {
                      from: "ai",
                      text: "Thinking...",
                      id: "searching-temp-ai",
                      isStreaming: true,
                    },
                  ]
              : messages
          }
          isLoadingMessages={isLoadingMessages}
        />
      </div>

      <div className="flex-shrink-0">
        <InputArea
          input={input}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          handleSendClick={handleSendClick}
          disabled={isSendingMessage || isLoadingMessages}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
