"use client";
import { useEffect, useRef } from "react";
import ProjectsCarousel from "@/components/projects/projectcarousel";
import ProfileSection from "@/components/profile/profilesection";
import SkillsSection from "@/components/skills/skillsection";
import ContactSection from "@/components/contact/contactsection";
import InfoSection from "@/components/info/infosection";
import resumeData from "@/data/resumeText";
import profile from "@/data/profile";
export default function ChatMessages({ messages, lampOn }) {
  const hidePlainTextForTypes = new Set([
    "projects",
    "profile",
    "education",
    "experience",
    "achievements",
    "hobbies",
    "contact",
  ]);

  const chatRef = useRef(null);

  useEffect(() => {
    const container = chatRef.current;

  if (!container) return;

  const scroll = () => {
    container.scrollTop = container.scrollHeight;
  };

  scroll();

  const observer = new ResizeObserver(scroll);

  observer.observe(container);

  return () => observer.disconnect();

  }, [messages]);

  return (

    <div
      ref={chatRef}
      className="hide-scrollbar"
      style={{
        width: "100%",
        maxWidth: "820px",
        height: "100%",
        minHeight: messages.length ? "220px" : "0px",
        maxHeight: "100%",
        padding: messages.length ? "16px" : "0px",
        transition: "all .3s ease",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRadius: messages.length ? "28px" : "0px",
        background: messages.length
          ? lampOn
            ? "rgba(255,255,255,0.2)"
            : "rgba(16,16,16,0.4)"
          : "transparent",
        backdropFilter: messages.length ? "blur(16px)" : "none",
        WebkitBackdropFilter: messages.length ? "blur(16px)" : "none",
        border: messages.length
          ? lampOn
            ? "1px solid rgba(255,255,255,0.65)"
            : "1px solid rgba(255,255,255,0.12)"
          : "none",
        boxShadow: messages.length
          ? lampOn
            ? "0 18px 50px rgba(0,0,0,0.08)"
            : "0 18px 50px rgba(0,0,0,0.35)"
          : "none",
      }}
    >

      {messages.map((msg, index) => (

        <div
          key={index}
          style={{
            alignSelf:
              msg.role === "user"
                ? "flex-end"
                : "flex-start",

            backgroundColor:
              msg.type === "projects" || msg.type === "profile"
             ? "transparent":
              msg.role === "user"
                ? lampOn ? "#ddd" : "#333"
                : lampOn ? "#cce4ff" : "#1e3a5f",

            color: lampOn ? "#000" : "#fff",

            padding: "10px 14px",
            borderRadius: "20px",
            maxWidth: "85%",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            
          }}
        >
          {msg.type === "projects" && (
         <ProjectsCarousel lampOn={lampOn}/>
         
            )}
            {msg.type === "profile" && (
              <div
                style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
               marginBottom: "20px"
                }}
                  >
              <ProfileSection lampOn={lampOn} />
             </div>
            )}
            {msg.type === "skills" && (
             <SkillsSection lampOn={lampOn} />
            )}
            {msg.type === "education" && (
              <InfoSection
                lampOn={lampOn}
                title="Education"
                embedded
                items={resumeData.education.map((item) => ({
                  title: item.institute || item.School,
                  subtitle: item.degree,
                  meta: [item.year, item.score || item.Score].filter(Boolean).join(" • "),
                }))}
              />
            )}
            {msg.type === "experience" && (
              <InfoSection
                lampOn={lampOn}
                title="Experience"
                embedded
                items={resumeData.experience.map((item) => ({
                  title: item.role,
                  subtitle: item.company,
                  description: item.description,
                }))}
              />
            )}
            {msg.type === "achievements" && (
              <InfoSection
                lampOn={lampOn}
                title="Achievements"
                embedded
                items={resumeData.achievements}
              />
            )}
            {msg.type === "hobbies" && (
              <InfoSection
                lampOn={lampOn}
                title="Hobbies"
                embedded
                items={profile.hobbies}
                variant="chips"
              />
            )}
            {msg.type === "contact" && (
              <div
                style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
               marginBottom: "20px"
                }}
                  >
            <ContactSection lampOn={lampOn} />
              </div>
            )}

              {!hidePlainTextForTypes.has(msg.type) && msg.text}

          {msg.type ==="resume" && (

            <div
              style={{
                marginTop: "12px",
                padding: "12px",
                borderRadius: "14px",

                background: lampOn
                  ? "rgba(255,255,255,0.35)"
                  : "rgba(20,20,20,0.5)",

                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",

                display: "flex",
                flexDirection: "column",
                gap: "10px",

                width: "220px"
              }}
            >

              {/* File Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

                <span style={{ fontSize: "20px" }}>📄</span>

                <div>
                  <div style={{ fontWeight: "600" }}>
                    Resume.pdf
                  </div>

                  <div style={{ fontSize: "12px", opacity: "0.7" }}>
                    Developer Resume
                  </div>
                </div>

              </div>


              {/* Buttons */}
              <div style={{ display: "flex", gap: "10px" }}>

                <a href="/Nitesh_Gupta_1RF23CS104 (1).pdf" target="_blank">
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "10px",
                      border: "none",
                      cursor: "pointer",

                      background: "#3b82f6",
                      color: "#fff",

                      fontSize: "13px",
                      transition: "all .2s ease"
                    }}

                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}

                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    View
                  </button>
                </a>


                <a href="/Nitesh_Gupta_1RF23CS104 (1).pdf" download>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "10px",
                      border: "none",
                      cursor: "pointer",

                      background: "#1d2aba",
                      color: "#fff",

                      fontSize: "13px",
                      transition: "all .2s ease"
                    }}

                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}

                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    Download
                  </button>
                </a>

              </div>

            </div>

          )}

        </div>

      ))}

    </div>
  );
}
