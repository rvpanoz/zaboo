import React, { useState, createContext } from "react";

const authContext = createContext();

const useAuth = () => {
  const [user, setUser] = useState(null);

  const authenticate = () => {
    console.log("authenticating..");
  };
  const signOut = () => {};

  return {
    user,
    authenticate,
    signOut
  };
};

export default useAuth;
