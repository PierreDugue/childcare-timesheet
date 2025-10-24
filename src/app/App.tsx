import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import { TimeLog } from "../pages/time-log";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TimeLog />} />
        <Route path="/log" element={<Navigate to="/" replace />} />
        {/* <Route path="/timesheets" element={<Heroes />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
