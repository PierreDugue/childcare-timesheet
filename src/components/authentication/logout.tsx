import { useDispatch } from "react-redux";
import { logout } from "../../slices/user-slice";
import { persistor } from "../../app/store";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

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
        <Button onClick={handleLogout} color="inherit">
            Logout
        </Button>
    );
}
