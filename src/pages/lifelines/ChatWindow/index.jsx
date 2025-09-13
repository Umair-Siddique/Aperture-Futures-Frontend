import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { API_URL } from "../../../constants";
import MessageWindow from "./ChatBox/MessageWindow";
import InputArea from "./ChatBox/InputArea";
import LifelineChatHeader from "./ChatBox/ChatHeader";
import { useAxios } from "../../../hooks";

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

const ChatWindow = ({
  activeId,
  conversationId,
  isFromAPI = false,
  onSend,
  shouldFetchMessages = false,
  title,
}) => {
  console.log(
    { activeId, conversationId, isFromAPI, shouldFetchMessages, title },
    "ChatWindow props"
  );
  const { request, loading } = useAxios();
  const [input, setInput] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [selectedModel, setSelectedModel] = useState(
    "claude-sonnet-4-20250514"
  );
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [messages, setMessages] = useState([]);
  const [streamingAiResponseText, setStreamingAiResponseText] = useState("");
  console.log(streamingAiResponseText, "this is streamingAiResponseText");
  const fetchConversationMessages = async (convId) => {
    if (!convId || !isFromAPI) return;

    setIsLoadingMessages(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user?.access_token;

      if (!access_token) {
        throw new Error("Access token not found. Please log in again.");
      }

      console.log("Fetching messages for conversation ID:", convId);

      // Use the conversations endpoint with the conversation ID
      const response = await request({
        route: `${API_URL}/conversations/${convId}/message`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("API Response:", response);

      // Handle the response based on your API structure
      const messagesData = response.items || [];

      // Transform the messages to match the expected format
      const transformedMessages = [];

      messagesData.forEach((msg) => {
        // Add user message if it exists
        if (msg.user_message && msg.user_message.content) {
          transformedMessages.push({
            id: msg.user_message.id,
            from: "user",
            text: msg.user_message.content,
            timestamp: msg.user_message.created_at || msg.created_at,
          });
        }

        // Add AI message if it exists
        if (msg.ai_message && msg.ai_message.content) {
          transformedMessages.push({
            id: msg.ai_message.id,
            from: "ai",
            text: msg.ai_message.content,
            timestamp: msg.ai_message.created_at || msg.created_at,
          });
        }
      });

      // Sort messages by timestamp to ensure proper order
      transformedMessages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      console.log("Transformed messages:", transformedMessages);

      setMessages(transformedMessages);
    } catch (error) {
      console.error("Error fetching conversation messages:", error);
      toast.error(`Failed to load messages: ${error.message}`);
      setMessages([]);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Function to fetch messages for legacy chat system (fallback)
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

  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      return;
    }

    if (shouldFetchMessages) {
      if (isFromAPI && conversationId) {
        fetchConversationMessages(conversationId);
      } else if (!isFromAPI) {
        fetchChatMessages(activeId);
      }
    } else {
      setMessages([]);
    }
  }, [activeId, conversationId, isFromAPI, shouldFetchMessages]);

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

      // Create FormData object
      const formData = new FormData();
      formData.append(
        "conversation_id",
        conversationId || activeId || uuidv4()
      );
      formData.append("title", title.trim());
      formData.append("query", query.trim());

      console.log([...formData.entries()], "this is the request payload");

      const response = await fetch(`${API_URL}/retriever/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      if (response.body) {
        // --- Streaming response handling ---
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

          const words = chunk.split(/\s+/);

          for (const word of words) {
            if (!word) continue;

            accumulatedText += (accumulatedText ? " " : "") + word;

            setStreamingAiResponseText(accumulatedText);

            await new Promise((r) => setTimeout(r, 30));
          }
        }

        return { success: true, response: accumulatedText };
      } else {
        // --- Non-streaming response handling ---
        let responseText;

        if (typeof response === "string") {
          responseText = response;
        } else if (response?.data) {
          responseText = response || JSON.stringify(response.data);
        } else {
          responseText = (await response.text?.()) || "No response received";
        }

        console.log(responseText, "non-streaming response");
        return { success: true, response: responseText };
      }
    } catch (error) {
      console.error("Error in sendRetrievalQuery:", error);
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

      // Update local messages state
      setMessages((prev) => [...prev, userMessageObj]);
      setInput("");

      // Call onSend to update parent component's chat list
      if (onSend) {
        onSend(userMessageObj);
      }

      const apiResponse = await sendRetrievalQuery(userMessage);

      const aiMessageObj = {
        from: "ai",
        text: apiResponse.success
          ? apiResponse.response
          : `Error: ${apiResponse.error}`,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        isStreaming: false,
        isError: !apiResponse.success,
      };

      // Update local messages state
      setMessages((prev) => [...prev, aiMessageObj]);

      // Call onSend to update parent component's chat list
      if (onSend) {
        onSend(aiMessageObj);
      }

      if (!apiResponse.success) {
        toast.error(`Failed to send message: ${apiResponse.error}`);
      }
    } catch (error) {
      console.error("Critical error in handleSendClick:", error);

      const errorMessageObj = {
        from: "ai",
        text: `A critical error occurred: ${error.message}`,
        isError: true,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessageObj]);

      if (onSend) {
        onSend(errorMessageObj);
      }

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

  const handleDownloadReport = async () => {
    if (!title) {
      toast.error("No title available for download");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const access_token = user?.access_token;

      if (!access_token) {
        throw new Error("Access token not found. Please log in again.");
      }

      toast.loading("Downloading report...", { id: "download-report" });

      const response = await request({
        route: `${API_URL}/report/download?title=${encodeURIComponent(title)}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Handle successful response
      if (response) {
        // Extract the text content from response
        let textContent = "";

        if (typeof response === "string") {
          textContent = response;
        } else if (response.data && typeof response.data === "string") {
          textContent = response.data;
        } else {
          textContent = JSON.stringify(response, null, 2);
        }

        // Create and download text file
        const blob = new Blob([textContent], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `${title}_report.txt`;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success("Report downloaded successfully as text file!", {
          id: "download-report",
        });
      }
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error(`Failed to download report: ${error.message}`, {
        id: "download-report",
      });
    }
  };

  // Show empty state when no active conversation
  if (!activeId) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="flex-shrink-0">
          <LifelineChatHeader
            currentModel={currentModel}
            showModelSelector={showModelSelector}
            setShowModelSelector={setShowModelSelector}
            onModelChange={handleModelChange}
            availableModels={AI_MODELS}
          />
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">
              No conversation selected
            </h3>
            <p>
              Select a conversation from the sidebar or create a new one to
              start chatting.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-shrink-0">
        <LifelineChatHeader
          currentModel={currentModel}
          showModelSelector={showModelSelector}
          setShowModelSelector={setShowModelSelector}
          onModelChange={handleModelChange}
          availableModels={AI_MODELS}
          conversationId={conversationId}
          isFromAPI={isFromAPI}
          onDownloadReport={handleDownloadReport}
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
