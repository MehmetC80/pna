import React, { useState, useEffect } from "react";
import Header from "./Header";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState("");
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/Registration`;
    navigate(path);
  };

  // const expiresIn = "1h";
  // const SECRET_KEY = "12345654321";

  // const token = jwt.decode(SECRET_KEY);

  const submitLogin = async () => {
    const res = await fetch("http://localhost:3500/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    // setUsers(res);
    // if (isAuthenticated({ email, password })) {
    //   const status = 401;
    //   const message = "Email & Password existieren";
    //   res.status(status).json({ status, message });
    //   return;
    // }

    // if (res.filter((m) => m.email === email)) {
    //   console.log("user existiert");
    //   navigate("/todo/Todo");
    // } else {
    //   console.log("user existiert nicht.");
  };

  // function createToken(payload) {
  //   return jwt.sign(payload, SECRET_KEY, { expiresIn });
  // }

  // function isAuthenticated({ email, password }) {
  //   return (
  //     users.filter(
  //       (user) => user.email === email && user.password === password
  //     ) !== -1
  //   );
  // }

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
