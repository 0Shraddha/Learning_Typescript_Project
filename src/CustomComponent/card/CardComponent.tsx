type CardProps = {
    title: string;
    count: number;
    cardStyles?: React.CSSProperties;
    headingStyles?: React.CSSProperties;
    countStyles?: React.CSSProperties;
  };
  
  export const CardComponent = ({
    title,
    count,
    cardStyles,
    headingStyles,
    countStyles,
  }: CardProps) => {
    return (
      <div
        style={{
          position: "relative",
          zIndex: 2,
  
          background: "rgba(250, 225, 221, 0.57)",
  
          borderRadius: "20px",
          padding: "26px",
  
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
  
          cursor: "pointer",
          transition: "all 0.35s ease",
          ...cardStyles,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform =
            "translateY(-6px) scale(1.02)";
         
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform =
            "translateY(0px) scale(1)";
         
        }}
      >
  
        <h3
          style={{
            color: "palevioletred",
            fontSize: "1.1rem",
            fontWeight: 700,
            letterSpacing: "0.8px",
            margin: 0,
  
            ...headingStyles,
          }}
        >
          {title}
        </h3>
  
        <span
          style={{
            background: "palevioletred",
            color: "antiquewhite",
  
            padding: "10px 16px",
            borderRadius: "14px",
  
            fontWeight: 600,
            fontSize: "0.85rem",
  
            boxShadow: "0 6px 14px rgba(219,112,147,0.25)",
  
            ...countStyles,
          }}
        >
          {count}
        </span>
      </div>
    );
  };