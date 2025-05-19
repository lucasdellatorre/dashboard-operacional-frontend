import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import Users from "./routes/Users";
import Suspects from "./routes/Suspects";
import WebChart from "./routes/WebChart";
import NetworkChart from "./routes/NetworkChart";
import Layout from "./components/layout/layout";
import Worksheet from "./routes/Worksheet";
import Operations from "./routes/Operations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/planilhas" element={<Worksheet />} />
        <Route path="/operacoes" element={<Operations />} />
        <Route path="/alvos" element={<Suspects />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/teia" element={<WebChart />} />
        <Route path="/teia-rede" element={<NetworkChart />} />
      </Route>
    </Routes>
  );
}

export default App;
