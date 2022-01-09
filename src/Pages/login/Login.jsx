import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import "./login.css";
import { Context } from "../../Context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handelSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOOGIN_START" });
    try {
      const res = await axios.post("https://blogservr.herokuapp.com/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESSFULL", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL" });
    }
  };
  
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form action="" className="loginForm" onSubmit={handelSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your registered username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit" disabled={isFetching}>Login</button>
        <button className="loginRegisterBtn">
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
      </form>
    </div>
  );
}
