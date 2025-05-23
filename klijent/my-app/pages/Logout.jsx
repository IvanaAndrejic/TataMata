import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cleanupComponentStyles } from '../src/js/styleCleaner';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Čišćenje stilova specifičnih za Logout komponentu
  useEffect(() => {

    cleanupComponentStyles(['logout']); // Čisti stilove specifične za Logout

    const logoutStyle = document.createElement("style");
    logoutStyle.innerHTML = `

      body {
        font-family: "Lexend", sans-serif; 
      }

      .logout-container {
        max-width: 31.25rem;
        padding: 2.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.625rem #0D1E49;
        text-align: center;
        margin: 0 auto;
        background: #f3f4f8;
        transition: transform 0.3s ease;
      }

      .logout-container:hover {
        transform: scale(1.03);
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
        animation: fadeIn 2s ease-out forwards, slideIn 1s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
        font-family: "Fugaz One", sans-serif;
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
          transform: translateY(1.25rem);
        }
        100% {
          transform: translateY(0);
        }
      }

      /* Responzivni stilovi za mobilne uređaje */
      @media (max-width: 768px) {
        .logout-container {
          padding: 1.5rem;
          max-width: 90%;
        }

        .logout-title {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }

        .logout-btn {
          width: 100%;
          font-size: 1rem;
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
        <h2 className='logout-title mb-4 mt-2'>Bez muke nema nauke!</h2>
        <Button className="logout-btn" variant="warning" onClick={handleLogout}>
          Izloguj se
        </Button>
      </div>
    </main>
  );
};

export default Logout;
