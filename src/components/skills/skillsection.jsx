"use client";
import { useEffect, useState } from "react";

const skillGroups = [
  {
    title: "Machine Learning",
    skills: ["Deep Learning", "Scikit-learn", "TensorFlow", "PyTorch","Model Deployment","Model Training","Data Preprocessing", "Model Evaluation"]
  },
  {
    title: "AI Technologies",
    skills: ["LLM's", "Transformers", "Prompt Engineering","RAG","N8N","LangChain"]
  },
  {
    title: "Programming",
    skills: ["Python", "C++", "JavaScript"]
  },
  {
    title: "Web Development",
    skills: ["React", "Next.js", "REST API's","Express.js","Node.js","MongoDB"]
  },
  {
    title: "Tools",
    skills: ["Git&GitHub", "VS Code", "Jupyter Notebook","Colab"]
  }
];

export default function SkillsSection({ lampOn }) {

  const [visibleGroups, setVisibleGroups] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setVisibleGroups(prev => {
        if (prev < skillGroups.length) return prev + 1;
        return prev;
      });

    }, 400);

    return () => clearInterval(interval);

  }, []);

  return (

    <div
      style={{
        width: "100%",
        maxWidth: "720px",
        display: "flex",
        flexDirection: "column",
        gap: "22px"
      }}
    >

      {skillGroups.slice(0, visibleGroups).map((group, index) => (

        <div key={index}>

          {/* GROUP TITLE */}

          <div
            style={{
              fontWeight: "600",
              marginBottom: "10px",
              fontSize: "16px"
            }}
          >
            {group.title}
          </div>

          {/* SKILL CHIPS */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >

            {group.skills.map((skill, i) => (

              <div
                key={i}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",

                  background: lampOn
                    ? "rgba(0,0,0,0.05)"
                    : "rgba(255,255,255,0.08)",

                  border: lampOn
                    ? "1px solid rgba(0,0,0,0.1)"
                    : "1px solid rgba(255,255,255,0.15)",

                  backdropFilter: "blur(10px)"
                }}
              >
                {skill}
              </div>

            ))}

          </div>

        </div>

      ))}

    </div>
  );
}