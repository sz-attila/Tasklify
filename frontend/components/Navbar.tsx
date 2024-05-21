"use client";
import Link from "next/link";
import React from "react";
import Button from "./Button";

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
          <Link href="/">
            <Button>BEJELENTKEZÉS</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
