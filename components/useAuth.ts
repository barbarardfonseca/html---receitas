import { getAuth, onAuthStateChanged, signOut, type User, } from "firebase/auth";

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const auth = getAuth();

  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });

  const logout = async () => {
    await signOut(auth);

    return navigateTo("/login");
  };

  return {
    user,
    logout,
  };
};