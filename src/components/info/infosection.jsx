"use client";

export default function InfoSection({ lampOn, title, items = [], variant = "list", embedded = false }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "820px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: lampOn ? "#111" : "#fff",
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: variant === "chips" ? "repeat(auto-fit, minmax(160px, 1fr))" : "1fr",
          gap: "12px",
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${title}-${index}`}
            style={{
              padding: variant === "chips" ? "14px 16px" : "16px 18px",
              borderRadius: "18px",
              background: embedded
                ? lampOn
                  ? "rgba(255,255,255,0.28)"
                  : "rgba(255,255,255,0.08)"
                : lampOn
                  ? "rgba(255,255,255,0.28)"
                  : "rgba(20,20,20,0.42)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: embedded
                ? lampOn
                  ? "1px solid rgba(255,255,255,0.45)"
                  : "1px solid rgba(255,255,255,0.12)"
                : lampOn
                  ? "1px solid rgba(255,255,255,0.58)"
                  : "1px solid rgba(255,255,255,0.12)",
              boxShadow: embedded
                ? "none"
                : lampOn
                  ? "0 10px 32px rgba(0,0,0,0.08)"
                  : "0 10px 32px rgba(0,0,0,0.3)",
            }}
          >
            {typeof item === "string" ? (
              <div style={{ lineHeight: "1.6" }}>{item}</div>
            ) : (
              <>
                <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                  {item.title}
                </div>
                {item.subtitle && (
                  <div style={{ opacity: 0.75, marginBottom: "6px" }}>
                    {item.subtitle}
                  </div>
                )}
                {item.meta && (
                  <div style={{ fontSize: "13px", opacity: 0.7, marginBottom: "8px" }}>
                    {item.meta}
                  </div>
                )}
                {item.description && (
                  <div style={{ lineHeight: "1.6" }}>{item.description}</div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
