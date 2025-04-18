import Button from 'react-bootstrap/Button';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // poziva logout funkciju iz konteksta
    toast.success("Uspešno ste se izlogovali!");
    navigate("/"); // ili gde želiš da ide korisnik posle logouta
  };

  return (
    <main>
      <div className="container mt-4 mb-4" style={{
          maxWidth: '500px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px #0D1E49', // zuti box-shadow
          textAlign: 'center',
          margin: '0 auto',
          background: '#f3f4f8'
        }}>
        <h2 className='mb-4 mt-2'>BEZ MUKE NEMA NAUKE!</h2>
        <Button variant="warning" onClick={handleLogout} 
        >
          Izloguj se
        </Button>
      </div>
    </main>
  );
};

export default Logout;
