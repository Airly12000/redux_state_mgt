import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

interface Props {
  children: any;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RouteIsLoggedIn>
              <Login />
            </RouteIsLoggedIn>
          }
        />
        <Route
          path="/user"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

const RouteIsLoggedIn = ({ children }: Props) => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
  const location = useLocation();
  if (isLoggedIn) {
    return <Navigate to="/user" state={{ from: location }} replace={true} />;
  }
  return children;
};

const RequireAuth = ({ children }: Props) => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }
  return children;
};

export default App;
