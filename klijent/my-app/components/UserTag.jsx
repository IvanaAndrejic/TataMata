import { Button, Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const UserTag = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isAdmin = user.isAdmin;

  return (
    <div
      style={{
        position: "fixed",
        top: "0.6rem",
        left: "0.6rem",
        zIndex: 9999,
      }}
    >
      <Button
        variant={isAdmin ? "outline-warning" : "outline-dark"}
        className="rounded-pill d-flex align-items-center justify-content-center shadow-sm"
        disabled
        style={{
          fontSize: "0.75rem",
          padding: "0.35rem 0.8rem", 
          pointerEvents: "none",
          opacity: 0.9,
          minWidth: "6.25rem", 
          backgroundColor: "#fff"
        }}
      >
        <FaUser className="me-1" size={14} /> 
        {user.name}
        {isAdmin && (
          <Badge
            bg="warning"
            text="dark"
            className="ms-2"
            style={{
              fontSize: "0.75rem", 
              padding: "0.2rem 0.5rem",
              minWidth: "3.125rem",
            }}
          >
            Admin
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default UserTag;
