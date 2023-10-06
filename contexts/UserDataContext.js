//contexts/UserDataContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UserDataContext = createContext();

export function useUserData() {
  return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
  const [mongoDBUser, setMongoDBUser] = useState({});

  // Fetch the MongoDB user data based on Firebase UID
  const fetchUserData = async (firebaseUID, token) => {
    try {
      const response = await axios.get(`/api/buyers/${firebaseUID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setMongoDBUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data from MongoDB:", error);
    }
  };

  const value = {
    mongoDBUser,
    fetchUserData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
