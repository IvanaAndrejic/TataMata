// UserBadge.jsx
import { Badge, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const UserBadge = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
      <Badge bg="primary" size="ml">{user.name} is logged in</Badge>
      {!isHome && (
        <>
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate("/")}>
            Home
          </Button>
        </>
      )}
    </div>
  );
};

export default UserBadge;
