"use client";

export default function ChatInput({
  input,
  setInput,
  sendMessage,
  lampOn
}) {

  return (
    <div
      style={{
  width: "100%",
  maxWidth: "820px",
  display:"flex",
  alignItems:"center",
  padding:"10px 14px",
  borderRadius:"40px",
  minHeight: "56px",


  background: lampOn
  ? "rgba(255,255,255,0.25)"
  : "rgba(20,20,20,0.45)",
  backdropFilter:"blur(12px)",
  WebkitBackdropFilter:"blur(12px)",

  border:"1px solid rgba(255,255,255,0.25)",

  boxShadow:"0 8px 30px rgba(0,0,0,0.1)",

  gap:"10px",
  zIndex:6
}}
    >

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e)=>{
           if(e.key === "Enter"){
            sendMessage()
         }
         }}
        placeholder="Ask anything about me..."
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: "15px",
          minWidth: 0,
          color: lampOn ? "#171414" : "#fff"
        }}
      />

      <button
        onClick={() => sendMessage()}
        onMouseEnter={(e)=>{
         e.currentTarget.style.transform="scale(1.07)";
         e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.25)";
        }}

        onMouseLeave={(e)=>{
         e.currentTarget.style.transform="scale(1)";
        e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.1)";
         }}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          background: "#3b82f6",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        ➜
      </button>

    </div>
  );
}