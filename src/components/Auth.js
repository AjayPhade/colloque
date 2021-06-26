import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { auth } from "../firebase/config";
import { getUserDetails } from "../firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("");
    const [currentUserDetails, setCurrentUserDetails] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
    }, []);

    useEffect(() => {
        if (currentUser !== "") getUserDetails(setCurrentUserDetails);
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, currentUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};
