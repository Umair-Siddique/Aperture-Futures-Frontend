import React from "react";

// NewAvatar component for bot/AI replies
export default function NewAvatar() {
  return (
    <div
      // style={{
      //   width: 50,
      //   height: 50,
      //   borderRadius: "50%",
      //   background: "linear-gradient(258.39deg, #B600EB 0%, #FFD470 102.66%)",
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   position: "relative",
      // }}
    >
      {/* Outer circle */}
      <div
        // style={{
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   width: 50,
        //   height: 50,
        //   borderRadius: "50%",
        //   border: "3px solid",
        //   borderColor: "#B600EB",
        //   boxSizing: "border-box",
        //   pointerEvents: "none",
        // }}
      />
      {/* Logo image */}
      <img
        src="/src/assets/Frame66.png"
        alt="Logo"
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
    </div>
  );
}

