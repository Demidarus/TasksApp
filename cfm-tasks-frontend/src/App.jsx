import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import TaskDetails from "./pages/tasks/TaskDetails";
import { useAuth } from "./contexts/auth-context";
import TaskUpdate from "./pages/tasks/TaskUpdate";
import TaskCreate from "./pages/tasks/TaskCreate";
import Profile from "./pages/Profile";

function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-task" element={<TaskCreate />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks/update/:id" element={<TaskUpdate />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/login"
            element={
              auth.isAuthenticated() ? <Navigate to="/" replace /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              auth.isAuthenticated() ? (
                <Navigate to="/" replace />
              ) : (
                <Register />
              )
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
