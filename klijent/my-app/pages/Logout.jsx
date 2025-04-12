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
      <div className="container">
        <h1>Hvala na poseti!</h1>
        <Button variant="outline-danger" onClick={handleLogout}>
          Izloguj se
        </Button>
      </div>
    </main>
  );
};

export default Logout;
