import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container-simple py-0 flex items-center gap-1">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Home
        </NavLink>
        <span className="text-muted-foreground">|</span>
        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          About
        </NavLink>
        <span className="text-muted-foreground">|</span>
        <NavLink
          to="/model"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Model
        </NavLink>
        <span className="text-muted-foreground">|</span>
        <NavLink
          to="/demo"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Demo
        </NavLink>
        <span className="text-muted-foreground">|</span>
        <NavLink
          to="/live"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Live
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
