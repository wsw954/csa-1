import { auth } from "/utils/firebase";

export const signUp = async (email, password) => {
  const result = await auth().createUserWithEmailAndPassword(email, password);
  // Optionally, save user data to MongoDB here
  return result.user; // This will return the user object
};

export const signIn = async (email, password) => {
  const result = await auth().signInWithEmailAndPassword(email, password);
  return result.user; // This will return the user object
};

export const signOut = async () => {
  await auth().signOut();
};
