import { NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";

import "./NavHeader.css";

export default function NavHeader() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">🏠Home</NavLink>
        </li>
        <li>
          <NavLink to="/participants">Deltager:</NavLink>
        </li>
        <li>
          <NavLink to="/disciplins">Discipliner:</NavLink>
        </li>
        <li>
          <NavLink to="/results">Resultater:</NavLink>
        </li>
        <li>
          <NavLink to="/opretform">Opret Deltager:</NavLink>
        </li>
        <li>
          <NavLink to="/disciplinform">Opret Disciplin:</NavLink>
        </li>
      </ul>
    </nav>
  );
}
