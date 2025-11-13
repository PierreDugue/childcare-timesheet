import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Login } from "../components/login";
import ProtectedRoute from "../components/protectedRoute";
import { DetailLogs } from "../pages/detail-logs";
import { Settings } from "../pages/settings";
import { TimeLog } from "../pages/time-log";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><TimeLog /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/log" element={<ProtectedRoute><Navigate to="/" replace /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/details/:familyId" element={<ProtectedRoute><DetailLogs /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
