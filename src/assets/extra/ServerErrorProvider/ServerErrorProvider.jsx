import React, { createContext, useState, useContext } from 'react';

const ServerErrorContext = createContext();

export const ServerErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  const addError = (message) => {
    setErrors([...errors, message]);
  };

  const removeError = (index) => {
    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  return (
    <ServerErrorContext.Provider value={{ errors, addError, removeError }}>
      {children}
    </ServerErrorContext.Provider>
  );
};

export const useServerError = () => {
  const context = useContext(ServerErrorContext);
  if (!context) {
    throw new Error('useServerError must be used within a ServerErrorProvider');
  }
  return context;
};