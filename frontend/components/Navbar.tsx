"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import Button from "./Button";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state, dispatch } = useAuth();
  const { isModalOpen } = useModal();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "LOGIN", payload: token });
    }
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    router.push("/");
  };

  return (
    <nav className={isMenuOpen ? "active" : ""}>
      <div className={`nav-container ${isModalOpen ? "blurred" : ""}`}>
        <div className="nav-logo">
          <img src="/logo2.svg" alt="Taskify Logo" />
          <span>TASKLIFY</span>
          <div className="nav-menu-icon" onClick={toggleMenu}>
            <img
              src={isMenuOpen ? "/cross.svg" : "/menu.svg"}
              alt="Menu Icon"
            />
          </div>
        </div>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link href="/task" className={pathname === "/task" ? "active" : ""}>
              TEENDŐIM
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className={pathname === "/dashboard" ? "active" : ""}
            >
              DASHBOARD
            </Link>
          </li>
          <div className="button-div">
            {state.isAuthenticated ? (
              <button className="button-logout" onClick={handleLogout}>
                KIJELENTKEZÉS
              </button>
            ) : (
              <Link href="/">
                <Button className="button">BEJELENTKEZÉS</Button>
              </Link>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
