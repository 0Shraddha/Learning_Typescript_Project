import { Upload } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          ...styles.link,
          ...(isActive ? styles.activeLink : {}),
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/pattern-detail"
        style={({ isActive }) => ({
          ...styles.link,
          ...(isActive ? styles.activeLink : {}),
        })}
      >
        Pattern List
      </NavLink>

      <NavLink
        to="/upload-pattern"
        style={({ isActive }) => ({
          ...styles.link,
          ...(isActive ? styles.activeLink : {}),
        })}
      >
       <Upload  size={16} style={{marginRight: '2px'}}/>  Upload Pattern
      </NavLink>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    gap: "18px",
    padding: "12px 30px",
    margin: "0px 40px",

    position: "sticky" as const,
    zIndex: 100,
  },

  link: {
    textDecoration: "none",
    color: "#5f4b4b",

    fontSize: "15px",
    fontWeight: 500,

    padding: "8px 18px",
    borderRadius: "10px",

    transition: "all 0.3s ease",

    letterSpacing: "0.5px",
  },

  activeLink: {
    background: "palevioletred",
    color: "white",
    transform: "translateY(-1px)",
  },
};