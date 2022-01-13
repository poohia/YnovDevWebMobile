import { useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const useFirebaseLogin = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const checkAuth = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  };

  const loggout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  const connectionWithGoogle = () => {
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  };

  const connectionWithEmailPassword = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).catch((err) => {
      if (err.message.includes("auth/user-not-found")) {
        createUserWithEmailAndPassword(auth, email, password);
      }
    });
  };

  return {
    user,
    checkAuth,
    connectionWithGoogle,
    connectionWithEmailPassword,
    loggout,
  };
};

export default useFirebaseLogin;
