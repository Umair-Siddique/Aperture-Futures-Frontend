import { MessageCircle } from "lucide-react";
import React from "react";

const EmptyState = ({ isChatOpened = false }) => (
  <div className="flex-1 flex items-center justify-center p-4 md:p-8">
    <div className="text-center max-w-2xl mx-auto">
      <div
        className="backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border"
        style={{
          backgroundColor: "rgba(31, 31, 31, 0.9)",
          borderColor: "rgba(31, 31, 31, 0.5)",
        }}
      >
        {/* Icon Section */}
        <div className="relative mb-8">
          <div
            className="absolute inset-0 rounded-full blur-lg opacity-30 animate-pulse"
            style={{
              background: "linear-gradient(45deg, #00C2A8, #5BC0EB, #0074A2)",
            }}
          />
          <div
            className="relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mx-auto shadow-xl"
            style={{
              background:
                "linear-gradient(135deg, #00C2A8 0%, #5BC0EB 50%, #0074A2 100%)",
            }}
          >
            <MessageCircle size={40} className="text-white drop-shadow-sm" />
          </div>
        </div>

        {/* Header */}
        {!isChatOpened ? (
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, white 0%, #E0E0E0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Please select a chat to start conversing with Bluelines Rag.
          </h1>
        ) : (
          <>
            <h1
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                background: "linear-gradient(135deg, white 0%, #E0E0E0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              How can I help you today?
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#E0E0E0" }}>
              Ask me anything! I can help analyze, summarize, and answer
              questions.{" "}
            </p>
          </>
        )}
      </div>
    </div>
  </div>
);

export default EmptyState;
