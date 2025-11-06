import { initializeApp, } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getFirestore, } from "firebase/firestore";

export const useFirebase = () => {
  const base64FirebaseConfig = String(useRuntimeConfig().public.firebaseConfig);
  const strFirebaseConfig = atob(base64FirebaseConfig);

  const firebaseConfig = JSON.parse(strFirebaseConfig);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  return { app, auth, db };
};