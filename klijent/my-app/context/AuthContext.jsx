import { createContext, useState, useContext, useEffect } from "react";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData); // Postavljamo korisnika nakon logovanja
  };

  const logout = () => {
    try {
      localStorage.clear(); // briše sve – možeš ići selektivno ako želiš preciznije
      setUser(null);
    } catch (error) {
      console.error("Greška pri izlogovanju:", error);
    }
  };
  
  // Učitaj korisnika iz localStorage-a kada se aplikacija učita
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
