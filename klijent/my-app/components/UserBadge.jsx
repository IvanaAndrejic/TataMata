import { Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const UserBadge = () => {
 
  const { user } = useAuth();

  if (!user) return null;


  return (

    <div style={{
      position: "fixed",
      top: "1rem",
      left: "1rem",
      zIndex: 1050,
    }}>
      <Badge bg="primary">{user.name}</Badge>
    </div>
  );
};

export default UserBadge;
