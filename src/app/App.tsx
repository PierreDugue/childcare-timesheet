import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Login } from "../components/login";
import ProtectedRoute from "../components/protectedRoute";
import { DetailLogs } from "../pages/detail-logs";
import { Settings } from "../pages/settings";
import { TimeLog } from "../pages/time-log";
import "./App.css";
import { Register } from "../components/register";
import { useEffect } from "react";
import { fetchFamilies } from "../slices/familySlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";

function App() {
  const { currentUser, _persist } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(currentUser)
    if (_persist.rehydrated && currentUser.token) {
      dispatch(fetchFamilies());
    }
  }, [_persist.rehydrated, currentUser.token, dispatch]);

  return (
    <BrowserRouter>
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
