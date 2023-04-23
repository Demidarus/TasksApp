import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [developer, setDeveloper] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedDeveloper = localStorage.getItem("developer");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedDeveloper) {
      setDeveloper(JSON.parse(storedDeveloper));
    }
  }, []);

  const isAuthenticated = () => {
    return token !== null;
  };

  const updateDeveloper = (updatedDeveloper) => {
    setDeveloper(updatedDeveloper);
    localStorage.setItem("developer", JSON.stringify(updatedDeveloper));
  };

  const login = (token, developer) => {
    setToken(token);
    setDeveloper(developer);
    localStorage.setItem("token", token);
    localStorage.setItem("developer", JSON.stringify(developer));
  };

  const logout = () => {
    setToken(null);
    setDeveloper(null);
    localStorage.removeItem("token");
    localStorage.removeItem("developer");
  };

  const value = {
    token,
    developer,
    setToken,
    setDeveloper,
    isAuthenticated,
    updateDeveloper,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Prop Types
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
