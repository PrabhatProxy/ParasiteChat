import { onAuthStateChanged } from "firebase/auth";
import { Children, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        });

        return () => {
            unsub();
        }
    }, []);
    return (
        <authContext.Provider value={{ currentUser}}>
            {children}
        </authContext.Provider>
    )
};