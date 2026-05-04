"use client";

export default function HeroText({ lampOn }) {
  return (
    <>
      {/* LEFT — desktop/tablet */}
      <div className="hero-side hero-left">
        <div style={{ fontSize: "clamp(20px, 3vw, 32px)", color: lampOn ? "#555" : "#aaa", marginBottom: "8px" }}>
          👋 Hi! I am
        </div>
        <div style={{ fontSize: "clamp(40px, 5vw, 80px)", fontWeight: "700", letterSpacing: "-1px", color: lampOn ? "#111" : "#fff", lineHeight: "1.05", whiteSpace: "nowrap" }}>
          Nitesh Gupta
        </div>
      </div>

      {/* RIGHT — desktop/tablet */}
      <div className="hero-side hero-right">
        <div style={{ fontSize: "clamp(19px, 2.7vw, 30px)", color: lampOn ? "#666" : "#aaa", marginBottom: "4px" }}>
          A
        </div>
        <div style={{ fontSize: "clamp(25px,3.9vw, 45px)", fontWeight: "700", lineHeight: "1", background: "linear-gradient(90deg,#cce4ff,#1e3a5f)", WebkitBackgroundClip: "text", color: "transparent", whiteSpace: "nowrap" }}>
          Machine Learning 
        </div>
        <div style={{ fontSize: "clamp(22px, 3vw, 44px)", fontWeight: "700", color: lampOn ? "#111" : "#fff", lineHeight: "1.05", whiteSpace: "nowrap" }}>
           Engineer
        </div>
      </div>

      {/* MOBILE */}
      <div className="hero-mobile-text">
        <div style={{ fontSize: "18px", color: lampOn ? "#555" : "#aaa", marginBottom: "6px" }}>👋 Hi! I am</div>
        <div style={{ fontSize: "clamp(30px, 8vw, 44px)", fontWeight: "700", color: lampOn ? "#111" : "#fff", lineHeight: "1.05", marginBottom: "8px" }}>
          Nitesh Gupta
        </div>
        <div style={{ fontSize: "15px", color: lampOn ? "#666" : "#aaa" }}>A</div>
        <div style={{ fontSize: "clamp(26px, 7vw, 38px)", fontWeight: "700", background: "linear-gradient(90deg,#cce4ff,#1e3a5f)", WebkitBackgroundClip: "text", color: "transparent", lineHeight: "1" }}>
          Machine Learning 
        </div>
        <div style={{ fontSize: "clamp(26px, 7vw, 38px)", fontWeight: "700", color: lampOn ? "#111" : "#fff", lineHeight: "1.05" }}>
          Engineer
        </div>
      </div>
    </>
  );
}
