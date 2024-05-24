import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ModalProvider>
        <html>
          <body>
            <Navbar />
            {children}
          </body>
        </html>
      </ModalProvider>
    </AuthProvider>
  );
}
