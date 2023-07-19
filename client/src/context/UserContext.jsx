import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  async function fetchMyAPI() {
    await axios.post('/profile')
      .then(({ data }) => {
        setUser(data);
        setReady(true);
      });
  }
  useEffect(() => {
    if (!user) {
      fetchMyAPI();
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  )
}