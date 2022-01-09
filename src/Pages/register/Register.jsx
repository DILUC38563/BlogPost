import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("https://blogservr.herokuapp.com/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("https://cranky-montalcini-c49ad1.netlify.app/login");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form action="" className="registerForm" onSubmit={handelSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your registered email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
        <button className="registerLoginBtn">
          <Link className="link" to="/login">
            Login
          </Link>
        </button>
        {error && (
          <span style={{ color: "red", paddingTop: 15 }}>
            Something Went Worng!
          </span>
        )}
      </form>
    </div>
  );
}
