import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Dashboard from "./routes/dashboard";
import Login from "./routes/login";
import Users from "./routes/users";
import Suspects from "./routes/suspects";
import Operation from "./routes/operation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route index path="/operation" element={<Operation />} />
        <Route path="/users" element={<Users />} />
        <Route path="/alvos" element={<Suspects />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
