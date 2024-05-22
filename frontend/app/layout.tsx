import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
