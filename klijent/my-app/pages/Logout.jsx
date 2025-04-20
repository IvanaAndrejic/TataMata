import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cleanupComponentStyles } from '../src/js/styleCleaner';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  //Čišćenje stilova specifičnih za Logout komponentu
  useEffect(() => {

    cleanupComponentStyles(['logout']); 

    const logoutStyle = document.createElement("style");
    logoutStyle.innerHTML = `
      
      .logout-container {
        max-width: 500px;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 0 10px #0D1E49;
        text-align: center;
        margin: 0 auto;
        background: #f3f4f8;
      }

      .logout-btn {
        margin-top: 1rem;
        background-color: #FDC840;
        border-color: #FDC840;
      }
      .logout-btn:hover {
        background-color: #f0a500 !important;
        border-color: #f0a500 !important;
      }

      .logout-title {
        color: #FDC840;
        margin-top: 2rem;
        margin-bottom: 3rem;
        font-weight: bold; /* Ispravljena greška u pisanju */
        animation: fadeIn 2s ease-out forwards, slideIn 1s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
      }

      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes slideIn {
        0% {
          transform: translateY(20px);
        }
        100% {
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(logoutStyle);

    return () => {
      document.head.removeChild(logoutStyle);
    };
  }, []);

  const handleLogout = () => {
    logout(); 
    toast.success("Uspešno ste se izlogovali!");
    navigate("/"); 
  };

  return (
    <main>
      <div className="logout-container">
        <h2 className='logout-title mb-4 mt-2'>BEZ MUKE NEMA NAUKE!</h2>
        <Button className="logout-btn" variant="warning" onClick={handleLogout}>
          Izloguj se
        </Button>
      </div>
    </main>
  );
};

export default Logout;
