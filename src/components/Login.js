import React, { useState, useEffect } from "react";

import Header from "./Header";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/Registration`;
    navigate(path);
  };

  const submitLogin = async () => {
    const res = await fetch("http://localhost:3500/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setEmail(res);
    setPassword(res);

    // if (res.filter((m) => m.email === email)) {
    //   console.log("user existiert");
    //   navigate("/todo/Todo");
    // } else {
    //   console.log("user existiert nicht.");
  };

const SECRET_KEY="12345654321";




  return (
    <div className="login">
      <Header title="Login" subTitle="" />;
      <Nav />;
      <main>
        <form>
          <input
            type="email"
            name="email"
            placeholder="email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="passwort"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btnLogin" onSubmit={submitLogin}>
            Log In
          </button>
          <button className="btnRegis " onClick={routeChange}>
            Sign Up
          </button>
        </form>
      </main>
    </div>
  );
};
export default Login;
