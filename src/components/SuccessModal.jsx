import React from "react";
import PropTypes from "prop-types";

const SuccessModal = ({ open, onClose, onGoToLifeline, title, description, buttonText, iconType }) => {
  if (!open) return null;
  
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        position: "relative",
        background: "#fff",
        borderRadius: 32,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        padding: "48px 40px 32px 40px",
        width: 600,
        maxWidth: "90vw",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}>
        {/* Icon centered in content */}
        <div style={{
          marginBottom: 24,
          zIndex: 2,
        }}>
          <div style={{
            background: iconType === "mail" ? "#FFF7E6" : "#E6FFF2",
            borderRadius: "50%",
            width: 72,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          }}>
            {iconType === "mail" ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#FF9500" strokeWidth="2" fill="#FF9500" fillOpacity="0.2"/>
                <polyline points="22,6 12,13 2,6" stroke="#FF9500" strokeWidth="2" fill="none"/>
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2" fill="#22C55E" fillOpacity="0.1"/>
              </svg>
            )}
          </div>
        </div>

        <h2 style={{ 
          fontWeight: 700, 
          fontSize: 32, 
          margin: "0 0 24px 0", 
          lineHeight: 1.2,
          color: "#000"
        }}>
          {title || "Account Created Successfully"}
        </h2>
        
        <p style={{ 
          color: "#666", 
          fontSize: 16, 
          marginBottom: 40, 
          marginTop: 0, 
          lineHeight: 1.5,
          maxWidth: "90%"
        }}>
          {description || "Welcome to Aperture Futures, your gateway to exploring UN Security Council resolutions and meeting data with the power of AI. You can now start using BlueLines or LifeLines to analyze historical and live UNSC records."}
        </p>
        
        <button
          style={{
            background: "#22C55E",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "16px 32px",
            width: "100%",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(34,197,94,0.20)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#16A34A";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#22C55E";
            e.target.style.transform = "translateY(0px)";
          }}
          onClick={onGoToLifeline}
        >
          {buttonText || "Go to Lifeline"}
        </button>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onGoToLifeline: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  iconType: PropTypes.string,
};

export default SuccessModal;