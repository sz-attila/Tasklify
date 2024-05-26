"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/Button";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Registration failed, please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="task-header">
        <h1 className="login-header">REGISZTRÁCIÓ</h1>
        <p>
          Adataid megadása után, már is <br /> létrehozhatod teendőidet.
        </p>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <input
                type="email"
                id="email"
                placeholder="E-mail cím"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Jelszó"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                id="confirm-password"
                placeholder="Jelszó mégegyszer"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="register-div">
            <Button type="submit" className="button">
              REGISZTRÁLOK
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
