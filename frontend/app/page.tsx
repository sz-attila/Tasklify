import Link from "next/link";
import Button from "../components/Button";
import "../styles/globals.css";

export default function Home() {
  return (
    <div className="login-container">
      <h1>BEJELENTKEZÉS</h1>
      <p>Jelentkezz be a teendőid kezeléséhez</p>
      <div className="login-form">
        <form>
          <div>
            <div>
              <input type="email" id="email" placeholder="email@email.hu" />
            </div>
            <div>
              <input type="password" id="password" placeholder="••••••••" />
            </div>
          </div>
          <Link href="">
            <p>Elfelejtett jelszó</p>
          </Link>
        </form>
      </div>
      <div className="submit-div">
        <Button type="submit">BEJELENTKEZÉS</Button>
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
