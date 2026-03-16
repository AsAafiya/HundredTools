import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const useError = () => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState("");

  const showError = (msg) => setError(msg);
  const hideError = () => setError("");

  return (
    <ErrorContext.Provider value={{ error, showError, hideError }}>
      {children}
      {error && (
        <div className="error-popup">
          <p>{error}</p>
          <button onClick={hideError}>X</button>
        </div>
      )}
    </ErrorContext.Provider>
  );
};