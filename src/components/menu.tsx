import { Link } from "react-router";
import { LogoutButton } from "./logout";

export function Menu() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <LogoutButton></LogoutButton>
        </li>
      </ul>
    </div>
  );
}
