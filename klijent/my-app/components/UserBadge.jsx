import { Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const UserBadge = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isHome = location.pathname === "/";

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        left: "1rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "flex-start",
      }}
    >
      <Badge bg="primary" size="ml">{user.name} is online</Badge>
    </div>
  );
};

export default UserBadge;
