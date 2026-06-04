type InfoProps = {
    name: string;
    bio: string;
    styles?: React.CSSProperties;
  };
  
  export const Info = (props: InfoProps) => {
    return (
      <div>
        <h1
          style={{
            ...styles.name,
            ...props.styles,
          }}
        >
          {props.name}
        </h1>
  
        <p style={styles.bio}>{props.bio}</p>
      </div>
    );
  };
  
  const styles = {
    sparkle: {
      position: "absolute" as const,
      top: "14px",
      right: "18px",
  
      fontSize: "18px",
      color: "palevioletred",
  
      opacity: 0.8,
    },
  
    name: {
      margin: 0,
      marginBottom: "14px",
      paddingTop: "20px",
      color: "palevioletred",
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "1px",
  
      fontFamily: '"Quicksand", sans-serif', // Corrected "san-serif" to "sans-serif"    },
    },
    bio: {
      margin: 0,
      color: "#6d5a5a",
      lineHeight: 1.8,
      fontSize: "15px",
    },
  };