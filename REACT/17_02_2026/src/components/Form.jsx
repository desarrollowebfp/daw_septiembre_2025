import { useState, useRef } from "react";
import "./Form.css";

const validate = (name, email) => {
  let nameError = "";
  let emailError = "";
  //Creamos una variable a modo de flag
  let hasError = false;

  if (name.trim() === "") {
    nameError = "El nombre es obligatorio";
    hasError = true;
  }

  if (email.trim() === "") {
    emailError = "El email es obligatorio";
    hasError = true;
  } else if (!email.includes("@")) {
    emailError = "El email tiene que contener una @";
    hasError = true;
  }

  return { nameError, emailError, hasError };
};

const Form = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const result = validate(name, email);

    setNameError(result.nameError);
    setEmailError(result.emailError);

    if (!result.hasError) {
      alert(`El usuario es: ${name} - ${email}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name"> Name</label>
      <input type="text" id="name" ref={nameRef} />
      {nameError !== "" && <p>{nameError}</p>}
      <label htmlFor="email">Email</label>
      <input type="email" id="email" ref={emailRef} />
      {emailError !== "" && <p>{emailError}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Form;
