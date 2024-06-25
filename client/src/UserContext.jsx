import { createContext, useEffect, useState } from "react";
import axios from 'axios';

// Create the UserContext
export const UserContext = createContext({});

// UserContextProvider component
export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready , setReady] = useState(false)

    useEffect(() => {
        if (!user) {
            axios.get('http://localhost:4000/profile', { withCredentials: true })
                .then(({ data }) => {
                    setUser(data);
                    setReady(true)
                })
                .catch(err => {
                    console.error("Error fetching profile:", err);
                });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser , ready}}>
            {children}
        </UserContext.Provider>
    );
}
