import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Dashboard from "./routes/dashboard";
import Login from "./routes/login";
import Users from "./routes/users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
