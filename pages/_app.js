import "@/styles/globals.css";
import { AuthProvider } from "/contexts/AuthContext";
import { UserDataProvider } from "/contexts/UserDataContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserDataProvider>
        <Component {...pageProps} />
      </UserDataProvider>
    </AuthProvider>
  );
}
