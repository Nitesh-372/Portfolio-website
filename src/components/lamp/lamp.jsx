"use client";

export default function Lamp({ lampOn, toggleLamp, bounce }) {

  return (

    <>
    
      {/* Pull Cord */}

      <div
        onClick={toggleLamp}
        style={{
          position: "absolute",
          top: "0px",
          left: "50%",
          transform: `translateX(-50%) scaleY(${bounce ? 1.3 : 1})`,
          width: "6px",
          height: bounce ? "120px" : "80px",
          backgroundColor: lampOn ? "#aaa" : "#555",
          cursor: "pointer",
          transition: "height .25s ease"
        }}
      />

      {/* Lamp Bulb */}

      <div
        onClick={toggleLamp}
        style={{
          position: "absolute",
          top: "80px",
          left: "50%",
          transform: `translateX(-50%) scaleY(${bounce ? 0.85 : 1})`,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: lampOn ? "#ffd54f" : "#444",
          boxShadow: lampOn
            ? "0 0 30px rgba(255,213,79,.8)"
            : "none",
          cursor: "pointer",
          transition: "transform .25s ease",
          zIndex: 10
        }}
      >

        {/* Lamp Shade */}

        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "60px",
            background:
              "linear-gradient(180deg,#8f98a1,#5f6a73)",
            clipPath:
              "polygon(10% 0%,90% 0%,100% 100%,0% 100%)",
            borderTopLeftRadius: "50% 40%",
            borderTopRightRadius: "50% 40%"
          }}
        />

      </div>

    </>
  );
}