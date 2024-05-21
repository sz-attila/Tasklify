"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/logo2.svg" alt="Taskify Logo" />
        <span>TASKLIFY</span>
      </div>
      <ul>
        <li>
          <Link href="">TEENDŐIM</Link>
        </li>
        <li>
          <Link href="">DASHBOARD</Link>
        </li>
        <li>
          <Link href="/">BEJELENTKEZÉS</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
