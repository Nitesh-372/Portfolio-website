"use client";

export default function ResumeCard({ lampOn }) {

  const cardStyle = {
    marginTop:"10px",
    padding:"16px",
    borderRadius:"16px",

    background: lampOn
      ? "rgba(255,255,255,0.25)"
      : "rgba(20,20,20,0.45)",

    backdropFilter:"blur(10px)",

    border:"1px solid rgba(255,255,255,0.2)",

    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:"10px",

    width:"260px"
  };

  const btnStyle = {
    padding:"8px 14px",
    borderRadius:"10px",
    border:"none",
    cursor:"pointer",
    fontSize:"14px"
  };

  return (

    <div style={cardStyle}>

      <div style={{fontWeight:"600"}}>
        Resume
      </div>

      <div style={{display:"flex", gap:"10px"}}>

        <a href="\Nitesh_Gupta_1RF23CS104 (1).pdf" target="_blank">
          <button style={btnStyle}>
            View
          </button>
        </a>

        <a href="\Nitesh_Gupta_1RF23CS104 (1).pdf" download>
          <button style={btnStyle}>
            Download
          </button>
        </a>

      </div>

    </div>

  );

}