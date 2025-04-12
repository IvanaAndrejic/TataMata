import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "../components/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Error from "../pages/Error"
import Login from "../pages/Login";
import TataMata from "../pages/TataMata";
import { createContext, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace></Navigate>;
};



function App() {
  
  return (
    <>
      <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainLayout></MainLayout>}>
                <Route index element={<Home></Home>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/tatamata" 
                  element={<ProtectedRoute> 
                              <TataMata /> 
                           </ProtectedRoute>}>
                </Route>
                <Route path="*" element={<Error></Error>}></Route>
              </Route>
          </Routes>  
        </BrowserRouter>   
      </AuthProvider>
      </div>
    </>
  )
}

export default App;
