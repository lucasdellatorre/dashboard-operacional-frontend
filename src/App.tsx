import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Dashboard from "./routes/dashboard";
import Login from "./routes/login";
import Users from "./routes/users";
import Suspects from "./routes/suspects";
import Operation from "./routes/operation";

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
