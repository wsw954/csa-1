import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "/utils/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Using the directly imported auth
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Properly unsubscribe when the component is unmounted
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
