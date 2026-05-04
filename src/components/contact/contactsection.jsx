"use client";

import { Icosahedron } from "@react-three/drei";

export default function ContactSection({ lampOn }) {

  const contacts = [
    {
      name: " Email",
      link: "mailto:niteshgupta429qweds@gmail.com",
      icon: "/gmail.png"

    },
    {
      name: " GitHub",
      link: "https://github.com/yourgithub",
      icon: "/github.svg"
    },
    {
      name: " LinkedIn",
      link: "https://linkedin.com/in/yourprofile",
      icon: "/linkedin (1).png"
      
    },
    {
      name: " Twitter",
      link: "https://twitter.com/yourhandle",
      icon: "/twitter.png"
    },
    {
      name: " Location",
      link: "https://www.google.com/maps/@41.3039383,-81.9015237,229m/data=!3m1!1e3?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
      icon: "/map.png"
    },
  ];
  

  
  return (

    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}
    >

      {contacts.map((item, index) => (
        

        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >

          <div
            style={{
              padding: "12px 18px",
              borderRadius: "16px",

              background: lampOn
                ? "rgba(255,255,255,0.25)"
                : "rgba(25,25,25,0.35)",

              backdropFilter: "blur(12px)",

              border: lampOn
                ? "1px solid rgba(255,255,255,0.6)"
                : "1px solid rgba(255,255,255,0.15)",

              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              cursor: "pointer",
              transition: "all .25s ease"
            }}
          >
            <img src={item.icon} alt={item.name} className="w-5 h-5" />

            <span>{" " + item.name}</span>

            <span></span>
           

          </div>

        </a>
        

      ))}

    </div>
  );
}