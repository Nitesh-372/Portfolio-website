"use client";

export default function AvatarContainer({ lampOn, chatMode, resetChat }) {
  return (
    <div
      onClick={() => { if (chatMode) resetChat(); }}
      style={{
        width: chatMode ? "90px" : "min(300px, 28vw)",
        height: chatMode ? "90px" : "min(400px, 44vh)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        transition: "all .5s ease",
        zIndex: 0,
        cursor: chatMode ? "pointer" : "default",
      }}
    >
      <img
        src={lampOn ? "/lightimg.png" : "/darkimg.png"}
        alt="Nitesh Gupta avatar"
        style={{
          width: "100%",
          height: "130%",
          objectFit: "contain",
          transition: "opacity .5s ease",
        }}
      />
    </div>
  );
}
