"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Link
              href="/tasks"
              className={pathname === "/tasks" ? "active" : ""}
            >
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
          <Link href="/">
            <Button className="button">BEJELENTKEZÉS</Button>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
