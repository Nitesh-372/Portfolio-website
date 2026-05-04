"use client";
import profile from "@/data/profile";

export default function ProfileSection({ lampOn }) {

  return (

    <div
      style={{
        width: "100%",
        maxWidth: "820px",
        borderRadius: "20px",
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "20px",
        justifyItems: "center",
        textAlign: "center",

        alignItems: "center",

        background: lampOn
          ? "rgba(255,255,255,0.35)"
          : "rgba(20,20,20,0.45)",

        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",

        border: lampOn
          ? "1px solid rgba(255,255,255,0.6)"
          : "1px solid rgba(255,255,255,0.15)",

        boxShadow: lampOn
          ? "0 10px 40px rgba(0,0,0,0.1)"
          : "0 10px 40px rgba(0,0,0,0.5)"
      }}
    >

      {/* PROFILE IMAGE */}

      <img
        src={profile.profileImage}
        alt="Nitesh Gupta profile photo"
        style={{
          width: "min(260px, 70vw)",
          height: "min(340px,70vw)",
          objectFit:"fill",
          borderRadius: "18px",
           border: lampOn
          ? "1px solid rgba(0,0,0,0.1)"
          : "1px solid rgba(255,255,255,0.15)"

        }}
      />

      {/* RIGHT SIDE CONTENT */}

      <div style={{ width: "100%" }}>

        <div style={{ fontSize: "30px", fontWeight: "600" }}>
          {profile.name}
        </div>

        <div style={{ opacity: 0.7, marginBottom: "16px" }}>
          {profile.role} • {profile.location}
        </div>

        <div style={{ lineHeight: "1.6", marginBottom: "16px" }}>
          Hey 👋 <br />
          {profile.fullBio}
        </div>

        {/* TAGS */}

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>

          {profile.tags.map(tag => (

            <span
              key={tag}
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px",

                background: lampOn
                  ? "rgba(0,0,0,0.05)"
                  : "rgba(255,255,255,0.08)"
              }}
            >
              {tag}
            </span>

          ))}

        </div>

      </div>

    </div>

  );
}
