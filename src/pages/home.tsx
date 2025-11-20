import { Link } from "react-router";
import { LogoutButton } from "../components/authentication/logout";

export function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/settings">Settings TEST</Link>
        </li>
        <li>
          <LogoutButton></LogoutButton>
        </li>
      </ul>
    </div>
  );
}
