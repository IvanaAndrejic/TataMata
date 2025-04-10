import {Routes, Route, BrowserRouter} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "../components/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Error from "../pages/Error"
import Login from "../pages/Login";



function App() {
  

  return (
    <>
      <div className="App">
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<MainLayout></MainLayout>}>
                <Route index element={<Home></Home>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="*" element={<Error></Error>}></Route>
              </Route>
        </Routes>  
      </BrowserRouter>   
      </div>
    </>
  )
}

export default App;
