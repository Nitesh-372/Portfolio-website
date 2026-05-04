"use client";

export default function LightCone({ lampOn }) {
  if (!lampOn) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "80px",         /* starts right at lamp base */
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(ellipse at top, rgba(255,213,79,0.35), transparent 70%)",
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        pointerEvents: "none",
        opacity: 0.75,
        zIndex: 2,            /* behind avatar (z:3) */
      }}
    />
  );
}
