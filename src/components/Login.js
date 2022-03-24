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
    fetch("http://localhost:3500/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    navigate("/todo/Todo");
  };

  // const [users, setUsers] = useState(null);

  // useEffect(() => {
  //   fetch("http://loclhost:8000/users")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

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
