import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "../components/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Error from "../pages/Error";
import Login from "../pages/Login";
import TataMata from "../pages/TataMata";
import { AuthProvider, useAuth } from "../context/AuthContext"; // Importujemo AuthContext
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "../pages/Logout";
import TataMataPage from "../pages/TataMataPage";
import { useLocation } from 'react-router-dom';
import Admin from "../pages/Admin";


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Proveravamo da li je korisnik ulogovan

  return user ? children : <Navigate to="/login" replace />;
};

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.isAdmin === true ? children : <Navigate to="/" replace />
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route
                path="/register"
                element={<Register />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/tatamata"
                element={
                  <ProtectedRoute>
                    <TataMata />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/logout"
                element={<Logout />}
              />
              <Route
                    path="/tatamata/:id"
                    element={
                      <ProtectedRoute>
                        <TataMataPage />
                      </ProtectedRoute>
                    }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <Admin />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
