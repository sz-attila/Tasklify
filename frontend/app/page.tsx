"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import "../styles/globals.css";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { dispatch } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        dispatch({ type: "LOGIN", payload: data.token });
        router.push("/task");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div className="login-container">
      <h1>BEJELENTKEZÉS</h1>
      <p>Jelentkezz be a teendőid kezeléséhez</p>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              placeholder="email@email.hu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link href="">
            <p>Elfelejtett jelszó</p>
          </Link>
          <div className="submit-div">
            <Button type="submit">BEJELENTKEZÉS</Button>
            <p>Még nincs fiókod?</p>
            <div className="registration-link">
              <Link href="/register">
                <Button type="button">REGISZTRÁLJ</Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
