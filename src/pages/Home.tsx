import { Info } from "../component/about/Info";
import bunny from "../bunny.jpg";

export const Home = () => {
  return (
    <div style={styles.wrapper}>
      <Info
        name="✿ Shraddha’s Dreamy Pattern Library"
        bio="Step into a soft world of yarn, stitches, and handmade stories."
        styles={{
          margin: 0,
          color: "palevioletred",
          textAlign: "center",
        }}
      />

      <img src={bunny} alt="bunny" style={styles.image} />
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    padding: "40px",
    textAlign: "center" as const,
  },

  subText: {
    marginTop: "14px",
    fontSize: "14px",
    fontStyle: "italic",
    color: "#7a5c5c",
    fontFamily: "Georgia, serif",
    opacity: 0.85,
  },

  image: {
    marginTop: "25px",
    width: "220px",
    height: "220px",
    objectFit: "cover" as const,
    borderRadius: "22px",
    border: "2px solid rgba(219,112,147,0.25)",
    transition: "0.3s ease",
  },
};