import { Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelopeOpenText } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "../src/utils/axiosConfig";
import UnreadAnswerClient from "./UnreadAnswerClient";

const UserTag = () => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/questions");
      const unanswered = res.data.filter((q) => !q.answer);
      setUnreadCount(unanswered.length);
    } catch (err) {
      console.error("Ne mogu da dohvatim nepročitana pitanja:", err);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) {
      fetchUnreadMessages();
    }

    const handleRefresh = () => {
      if (user?.isAdmin) {
        fetchUnreadMessages();
      }
    };

    window.addEventListener("refreshUnreadBadge", handleRefresh);
    return () => window.removeEventListener("refreshUnreadBadge", handleRefresh);
  }, [user]);

  if (!user) return null;

  const isAdmin = user.isAdmin;

  return (
    <div
      style={{
        position: "fixed",
        top: "0.6rem",
        left: "0.6rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        fontFamily: "Lexend, sans-serif",
      }}
    >
      <div style={{ position: "relative" }}>
        <Button
          variant={isAdmin ? "outline-warning" : "outline-dark"} // Bedž za korisnika ili admina koji je ulogovan
          className="rounded-pill d-flex align-items-center justify-content-center shadow-sm"
          disabled
          style={{
            fontSize: "0.75rem",
            padding: "0.35rem 0.8rem",
            pointerEvents: "none",
            opacity: 0.9,
            minWidth: "6.25rem",
            backgroundColor: "#fff",
            position: "relative",
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
          {!isAdmin && <UnreadAnswerClient />}
        </Button>
      </div>

      {isAdmin && unreadCount > 0 && (
        <div className="mt-1 ms-1">
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>Neodgovorenih poruka</Tooltip>}
          >
            <Badge
              bg="danger"
              className="d-flex align-items-center"
              style={{
                fontSize: "0.7rem",
                padding: "0.3rem 0.5rem",
              }}
            >
              <FaEnvelopeOpenText className="me-1" />
              {unreadCount}
            </Badge>
          </OverlayTrigger>
        </div>
      )}

      {/* Responzivnost */}
      <style>
        {`
          @media (max-width: 400px) {
            div[style*="position: fixed"] {
              top: 0.2rem;
              left: 0.2rem;
            }
            .rounded-pill {
              font-size: 0.65rem;
              padding: 0.3rem 0.6rem;
              min-width: 5.5rem;
            }
            .rounded-pill .badge {
              font-size: 0.65rem;
              padding: 0.2rem 0.4rem;
            }
            .mt-1 {
              margin-top: 0.5rem;
            }
            .ms-1 {
              margin-left: 0.3rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default UserTag;
