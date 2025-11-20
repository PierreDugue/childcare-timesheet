import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Login } from "../components/authentication/login";
import { Register } from "../components/authentication/register";
import { DetailLogs } from "../pages/detail-logs";
import { Settings } from "../pages/settings";
import { TimeLog } from "../pages/time-log";
import { fetchFamilies } from "../slices/family-slice";
import "./App.css";
import type { RootState } from "./store";
import { NavigationInitializer } from "../components/navigation/navigation";
import "../global.scss";
import ProtectedRoute from "../components/navigation/protectedRoute";

function App() {
  const { currentUser, _persist } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (_persist.rehydrated && currentUser.token) {
      dispatch(fetchFamilies());
    }
  }, [_persist.rehydrated, currentUser.token, dispatch]);

  return (
    <BrowserRouter>
      <NavigationInitializer />
      <Routes>
        <Route path="/" element={<ProtectedRoute><TimeLog /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/log" element={<ProtectedRoute><Navigate to="/" replace /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/details/:familyId" element={<ProtectedRoute><DetailLogs /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
