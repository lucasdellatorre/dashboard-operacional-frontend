import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import Users from "./routes/Users";
import Suspects from "./routes/Suspects";
import Operation from "./routes/Operations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/operacoes" element={<Operation />} />
        <Route path="/alvos" element={<Suspects />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
