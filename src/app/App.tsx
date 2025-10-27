import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import { TimeLog } from "../pages/time-log";
import { Settings } from "../pages/settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TimeLog />} />
        <Route path="/log" element={<Navigate to="/" replace />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
