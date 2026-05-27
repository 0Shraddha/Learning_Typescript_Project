import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? "red" : "black",
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/pattern-detail"
        style={({ isActive }) => ({
          color: isActive ? "red" : "black",
        })}
      >
        Pattern List
      </NavLink>

      <NavLink
        to="/upload-pattern"
        style={({ isActive }) => ({
          color: isActive ? "red" : "black",
        })}
      >
        Contact
      </NavLink>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    padding: "20px",
  },
};