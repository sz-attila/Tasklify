"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../components/Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className={isMenuOpen ? "active" : ""}>
      <div className="nav-container">
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
          {isLoggedIn ? (
            <button className="button-logout" onClick={handleLogout}>
              KIJELENTKEZÉS
            </button>
          ) : (
            <Link href="/">
              <Button className="button">BEJELENTKEZÉS</Button>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
