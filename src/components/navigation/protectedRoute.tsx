import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { RootState } from "../../app/store";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { currentUser, _persist } = useSelector((state: RootState) => state.user);
    if (!_persist?.rehydrated) {
        return (<div> Loading...</div >);
    }

    if (!currentUser.token.length) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
