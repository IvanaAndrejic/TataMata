import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UnreadAnswerClient = ({ onUpdate }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUnreadCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/questions/unread-count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUnreadCount(data.unreadCount);
          if (onUpdate) onUpdate(data.unreadCount);
        }
      } catch (err) {
        console.error("Greška pri učitavanju nepročitanih odgovora:", err);
      }
    };

    const markAnswersAsRead = async () => {
      try {
        await fetch("http://localhost:5000/api/questions/mark-read-user", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUnreadCount(0);
        if (onUpdate) onUpdate(0);
      } catch (err) {
        console.error("Greška pri označavanju odgovora kao pročitanih:", err);
      }
    };

    if (location.pathname === "/tatamata/6") {
      markAnswersAsRead();
    } else {
      fetchUnreadCount();
      const interval = setInterval(fetchUnreadCount, 5000);
      return () => clearInterval(interval);
    }
  }, [location, onUpdate]);

  if (unreadCount === 0) return null;

  return (
    <div
      style={{
        backgroundColor: "red",
        color: "white",
        borderRadius: "9999px",
        padding: "0.25rem 0.5rem",
        fontSize: "0.75rem",
        fontWeight: "bold",
        position: "absolute",
        top: "-5px",
        right: "-5px",
      }}
    >
      {unreadCount}
    </div>
  );
};

export default UnreadAnswerClient;
