import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";

import { firebase } from "../firebaseClient";

export const AuthContext = createContext<{
  user: firebase.User;
  setUser: React.Dispatch<React.SetStateAction<firebase.User>> | null;
}>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`);
      if (!user) {
        console.log(`no token found...`);
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
        return;
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
