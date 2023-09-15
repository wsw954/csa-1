import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "/utils/firebase";

export const signUp = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user; // This will return the user object
};

export const signIn = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user; // This will return the user object
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};
