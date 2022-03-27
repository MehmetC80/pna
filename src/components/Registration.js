import Header from "./Header";
import Nav from "./Nav";
import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";

const url = "http://localhost:3500/users";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // let navigate = useNavigate();

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //   })();
  // }, []);

  const onSubmit = async (data) => {
    // const postOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: uuidv4(),
    //     firstName: data.userfirstname,
    //     lastName: data.userlastname,
    //     email: data.useremail,
    //     password: data.userpassword,
    //   }),
    // };
    // await fetch(url, postOptions);

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: uuidv4(),
        firstName: data.userfirstname,
        lastName: data.userlastname,
        email: data.useremail,
        password: data.userpassword,
      }),
    });
  };
  // navigate("/Login");

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  // const addNewUserHandler = () => {

  // const requestOptions = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     id: uuidv4(),
  //     firstName: firstname,
  //     lastName: lastname,
  //     email: email,
  //     password: passwort,
  //   }),

  // const result = fetch(url, requestOptions);
  // setUsers(result);
  // navigate("/Login");
  // fetch(url, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       users.push(data);
  //     });
  // navigate("/Login");

  // };

  return (
    <div className="registration">
      <Header title="Registration" />
      <Nav />

      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("userfirstname", { required: true })}
            placeholder="Vorname..."
          />
          {errors.userfirstname && (
            <p id="errorRegister">Vorname ist erforderlich!</p>
          )}
          <input
            type="text"
            {...register("userlastname", { required: true })}
            placeholder="Nachname..."
          />
          {errors.userlastname && (
            <p id="errorRegister">Nachname ist erforderlich!</p>
          )}
          <input
            type="email"
            {...register("useremail", { required: true })}
            placeholder="email..."
          />
          {errors.useremail && (
            <p id="errorRegister">Email ist erforderlich!</p>
          )}
          <input
            type="password"
            {...register("userpassword", {
              required: "Passwort ist erforderlich!",
              minLength: { value: 6, message: "Passwort ist zu kurz!" },
            })}
            placeholder="Passwort..."
          />
          {errors.userpassword && (
            <p id="errorRegister">{errors.userpassword.message}</p>
          )}

          <button className="btnRegis" type="submit">
            Registrieren
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
