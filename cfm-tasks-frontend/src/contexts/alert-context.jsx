import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Alert } from "flowbite-react";

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const value = {
    showAlert,
  };

  return (
    <AlertContext.Provider value={value}>
      {alert && (
        <Alert color={alert.type} className="mb-10 mt-10">
          <span>
            <span className="font-medium">{alert.message}</span>
          </span>
        </Alert>
      )}
      {children}
    </AlertContext.Provider>
  );
}

// Prop Types
AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
