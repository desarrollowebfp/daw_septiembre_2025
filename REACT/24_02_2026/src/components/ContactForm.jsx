import { useActionState } from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ContactForm = () => {
  const [state, submitAction, pending] = useActionState(
    async (prevState, formData) => {
      const name = String(formData.get("name" || ""));
      const email = String(formData.get("email" || ""));

      if (!name) {
        return "Falta el nombre";
      }

      if (!email.includes("@")) {
        return "Formato de e-mail no valido";
      }

      await wait(3000);

      const res = await fetch("https://jsonplaceholder.typicode.com/postssgds", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        return "Error del servidor de mentira";
      }

      const data = await res.json();

      return `Enviado correctamente al servidor`;
    },
    "",
  );

  return (
    <>
      <h2>Formulario</h2>
      <form action={submitAction} method="post">
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="email" placeholder="email@email.com" />
        <button type="submit">Enviar</button>
      </form>
      {pending && <p>Pendiente...</p>}
      {state && <p>{state}</p>}
    </>
  );
};

export default ContactForm;
