"use client";

export default function PromptButtons({ sendMessage, lampOn }) {

  const prompts = [
    "Me",
    "Projects",
    "Skills",
    "Resume",
    "Contacts"
  ];

  return (
    
    <div
      className="prompt-grid"
      style={{
        width: "100%",
        maxWidth: "820px",
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        justifyContent: "center",
        gap: "15px",
        marginTop: "20px",
        flexWrap: "wrap",
        alignItems: "center"

      }}
    >

      {prompts.map((item) => (

        <button
          key={item}
          onClick={() => sendMessage(item)}
          onMouseEnter={(e)=>{
            e.currentTarget.style.transform="scale(1.05)";
             e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.25)";
  }}

          onMouseLeave={(e)=>{
              e.currentTarget.style.transform="scale(1)";
              e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.1)";
            }}
          style={{
           width: "100%",
           minWidth: "140px",
           minHeight: "84px",
           padding: "12px",
           borderRadius: "20px",
           border: "1px solid rgba(255,255,255,0.25)",

            background:  lampOn
              ? "rgba(255,255,255,0.25)"
                : "rgba(20,20,20,0.45)",
            backdropFilter:"blur(10px)",
            WebkitBackdropFilter:"blur(10px)",

            color: lampOn ? "#000" : "#fff",
             boxShadow:"0 6px 20px rgba(0,0,0,0.1)",
            cursor: "pointer"
          }}
        >

          {item}

        </button>

      ))}

    </div>
  );
}
