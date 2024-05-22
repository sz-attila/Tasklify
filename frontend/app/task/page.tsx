"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../../components/Button";
import "../../styles/globals.css";

const TaskPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <h1>AZ OLDAL ELÉRÉSÉHEZ JELENTKEZZ BE.</h1>
        <div className="submit-div">
          <Link href="/">
            <Button type="button">BEJELENTKEZÉS</Button>
          </Link>
          <p>Még nincs fiókod?</p>
          <div className="registration-link">
            <Link href="/register">
              <Button type="button">REGISZTRÁLJ</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Tasks</h1>
    </div>
  );
};

export default TaskPage;
