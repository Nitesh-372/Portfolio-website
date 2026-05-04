"use client";

import { useEffect, useRef, useState } from "react";
import projects from "@/data/projects";

export default function ProjectsCarousel({ lampOn }) {

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (selectedProject || isHovered) {
      stopAutoSlide();
      return;
    }

    stopAutoSlide();

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % projects.length;
        const slider = sliderRef.current;

        if (slider) {
          slider.scrollTo({
            left: nextIndex * 200,
            behavior: "smooth"
          });
        }

        return nextIndex;
      });
    }, 2000);

    return () => stopAutoSlide();
  }, [selectedProject, isHovered]);

  /* -----------------------------
     COMPONENT
  ------------------------------*/

  return (
    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
      {/* CAROUSEL SLIDER */}

    <div
      ref={sliderRef}

      className="hide-scrollbar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}

      onWheel={(e)=>{
        e.currentTarget.scrollLeft += e.deltaY;
      }}

      style={{
        width:"100%",
        maxWidth:"800px",
        minHeight:"320px",
        height:"auto",

        display:"flex",
        gap:"20px",

        overflowX:"auto",
        overflowY:"hidden",

        padding:"10px",

        scrollBehavior:"smooth"
      }}
    >

      {projects.map((project, index) => (

        <div
          key={project.id}
          onClick={() => setSelectedProject(project)}
          onMouseEnter={() => {
          if (selectedProject) return;
          setActiveIndex(index);

         const slider = sliderRef.current;

         if (slider) {
           slider.scrollTo({
            left: index * 200,
            behavior: "smooth"
           });
          }
         }}

          style={{
            minWidth:"220px",
            width:"min(220px,70vw)",
            flex:"0 0 auto",
            cursor: "pointer",

            transform:
              activeIndex === index
                ? "scale(1.08)"
                : "scale(0.95)",

            opacity:
              activeIndex === index
                ? 1
                : 0.6,

            transition:"all .4s ease",

            borderRadius:"20px",
            padding:"14px",

            background: lampOn
              ? "rgba(255,255,255,0.25)"
              : "rgba(25,25,25,0.35)",

            backdropFilter:"blur(14px)",
            WebkitBackdropFilter:"blur(14px)",

            border: lampOn
              ? "1px solid rgba(255,255,255,0.6)"
              : "1px solid rgba(255,255,255,0.15)",

            boxShadow: lampOn
              ? "0 8px 32px rgba(0,0,0,0.08)"
              : "0 8px 32px rgba(0,0,0,0.35)",

            backgroundImage:
              "linear-gradient(120deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05))"
          }}
        >

          <img
            src={project.image}
            alt={`${project.title} preview`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/file.svg";
            }}
            style={{
              width:"100%",
              height:"170px",
              objectFit:"cover",
              borderRadius:"10px",
              marginBottom:"10px"
            }}
          />

          <div style={{ fontWeight:"600" }}>
            {project.title}
          </div>

          <div style={{ fontSize:"13px", opacity:0.7 }}>
            {project.short}
          </div>

        </div>

      ))}

    </div>

      {/* ENLARGED VIEW (MODAL) */}
      {selectedProject && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
            display: "flex",
            alignItems: "left",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            padding: "20px"
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            style={{
              width: "100%",
              maxWidth: "500px",
              background: lampOn ? "rgba(255,255,255,0.9)" : "rgba(30,30,30,0.9)",
              borderRadius: "24px",
              padding: "30px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              border: lampOn ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.1)",
              textAlign: "center",
              position: "relative"
            }}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: lampOn ? "#000" : "#fff"
              }}
            >
              ✕
            </button>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              style={{ width: "80%",height:"50%", borderRadius: "15px", marginBottom: "20px" }} />

            <h2 style={{ marginBottom: "10px", color: lampOn ? "#111" : "#fff",fontWeight: "bold", fontSize: "25",}}>
              {selectedProject.title}
            </h2>

            <p style={{ lineHeight: "1.6", opacity: 0.8, marginBottom: "25px", color: lampOn ? "#333" : "#ddd" }}>
              {selectedProject.description || selectedProject.short}
            </p>

            {selectedProject.github && (
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "10px 24px",
                  borderRadius: "30px",
                  background: lampOn ? "#111" : "#fff",
                  color: lampOn ? "#fff" : "#111",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "transform 0.2s"
                }}
              >
                View on GitHub
              </a>
            )}
          </div>
        </div>
      )}
    </div>

  );
}
