import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { persistor } from "../app/store";
import { useNavigate } from "react-router";

export function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        persistor.flush();
        persistor.purge();
        navigate("/login", { replace: true });
    };

    return (
        <button onClick={handleLogout} style={{ padding: "0.5rem 1rem" }}>
            Logout
        </button>
    );
}
