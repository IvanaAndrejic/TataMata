import { createContext, useState, useContext, useEffect } from "react";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));  // Spremamo korisničke podatke
    localStorage.setItem("token", token);
    setUser(userData);  // Postavljamo korisnika sa isAdmin flagom
  };

  const logout = () => {
    try {
      localStorage.clear();
      setUser(null);
    } catch (error) {
      console.error("Greška pri izlogovanju:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      // Proverite da li je token prisutan, ali verifikaciju radite na serveru
      setUser(JSON.parse(storedUser)); // Ako je token prisutan, postavljamo korisnika
    }
  }, []);

  return (
    <Authcontext.Provider value={{ user, login, logout }}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  return useContext(Authcontext);
};
