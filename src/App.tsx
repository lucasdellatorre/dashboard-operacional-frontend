import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Dashboard from "./routes/dashboard";
import Login from "./routes/login";
import Users from "./routes/users";
import Suspects from "./routes/suspects";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/alvos" element={<Suspects />} />
      </Route>
    </Routes>
  );
}

export default App;
