import Header from "./Header";
import Nav from "./Nav";
import React from "react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:3100/users";

const Registration = () => {
  const [users, setUsers] = useState([]);

  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data);
      console.log(data);
    })();
  }, []);

  const addUserHandler = () => {
    if (users.find((user) => user.email === email)) return console.log("test");
    else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuidv4(),
          firstName: fName,
          lastName: lName,
          email: email,
          password: password,
        }),
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          users.push(data);
        });
      navigate("/Login");
    }
  };

  return (
    <div className="registration">
      <Header title="Registration" />
      <Nav />

      <main>
        <form action="">
          <input
            type="text"
            name="name"
            placeholder="Vorname..."
            required
            value={fName}
            onChange={(e) => setFname(e.target.value)}
          />
          <input
            type="text"
            name="name"
            placeholder="Nachname..."
            required
            value={lName}
            onChange={(e) => setLname(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password "
            name="password"
            placeholder="passwort"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btnRegis" onClick={addUserHandler}>
            Sign Up
          </button>
          <button className="btnReset" type="reset">
            Reset
          </button>
        </form>
      </main>
    </div>
  );
};

export default Registration;
