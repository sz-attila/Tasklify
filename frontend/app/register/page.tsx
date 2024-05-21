import React from "react";
import Link from "next/link";
import Button from "../../components/Button";

const RegisterPage = () => {
  return (
    <div className="login-container">
      <h1>REGISZTRÁCIÓ</h1>
      <p>
        Adataid megadása után, már is
        <br /> létrehozhatod teendőidet.
      </p>
      <div className="login-form">
        <form>
          <div>
            <div>
              <input type="email" id="email" placeholder="E-mail cím" />
            </div>
            <div>
              <input type="password" id="password" placeholder="Jelszó" />
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Jelszó mégegyszer"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="register-div">
        <Button type="submit">REGISZTRÁLOK</Button>
      </div>
    </div>
  );
};

export default RegisterPage;
